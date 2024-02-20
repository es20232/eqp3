from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Comment, Deslike, Like, Post, User
from ..serializers.comment_serializers import (
    CommentSerializer,
    SimplifiedCommentSerializer,
)
from ..serializers.deslike_serializers import DeslikeSerializer
from ..serializers.like_serializers import LikeSerializer
from ..serializers.post_serializers import CreatePostSerializer, PostSerializer


class CreatePostViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @transaction.atomic
    @action(
        detail=True,
        methods=["POST"],
        url_path="posts/create",
        url_name="create-posts",
    )
    def create_post(self, request, pk=None):
        """
        Create post.
        POST /api/v1/users/pk/posts
        """
        user = User.objects.filter(pk=pk, is_active=True)
        image_data = request.data.get("image", None)

        if image_data is None:
            return Response(
                {"message": "A imagem é obrigatória."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.exists():
            post_data = {
                "image": image_data,
                "user": user.get().pk,
                "caption": request.data["caption"],
            }

            serializer = CreatePostSerializer(data=post_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"message": "Usuário não encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )


class PostsFromUserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @action(
        detail=True,
        methods=["GET"],
        url_path="posts",
        url_name="user-posts",
    )
    def posts_from_user(self, request, pk=None):
        """
        Get all posts from active user.
        GET /api/v1/users/pk/posts
        """
        user = User.objects.filter(pk=pk, is_active=True)
        if user.exists():
            posts = Post.objects.filter(user=user.get(), is_active=True)
            data = PostSerializer(posts, many=True).data
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND
            )


class CommentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def update(self, request, pk=None):
        """
        Update comment.
        PUT /api/v1/comments/pk/
        """

        comment = Comment.objects.filter(pk=pk)

        if comment.exists():
            if request.user != comment.get().user:
                return Response(
                    {"message": "Permissão negada."}, status=status.HTTP_403_FORBIDDEN
                )

            serializer = CommentSerializer(
                comment.get(), data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"message": "Comentário não encontrado."},
                status=status.HTTP_404_NOT_FOUND,
            )

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete a comment.
        DELETE /api/v1/comments/pk
        """
        comment = Comment.objects.filter(pk=pk)

        if not comment.exists():
            return Response(
                {"message": "Comentário não encontrado."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.user == comment.get().post.user:
            comment.get().delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Permissão negada."},
                status=status.HTTP_403_FORBIDDEN,
            )


class CreateCommentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    @action(
        detail=True,
        methods=["POST"],
        url_path="comments/create",
        url_name="comment-on-post",
    )
    def comment_on_post(self, request, pk=None):
        post = Post.objects.filter(is_active=True, pk=pk)
        if post.exists():
            user = request.user

            comment = Comment.objects.filter(post=post.get().pk, user=user.pk)
            if comment.exists():
                return Response(
                    {"message": "O Post já foi comentado."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            comment_data = {
                "comment": request.data["comment"],
                "user": user.pk,
                "post": post.get().pk,
            }

            serializer = CommentSerializer(data=comment_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"message": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND
        )


class CommentsFromPostViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    @action(
        detail=True,
        methods=["GET"],
        url_path="comments",
        url_name="comments-post",
    )
    def post_comments(self, request, pk=None):
        post = Post.objects.filter(is_active=True, pk=pk)
        if post.exists():
            comments = Comment.objects.filter(post=post.get().pk)
            serializer = SimplifiedCommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"message": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND
        )


class PostViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def get_all_posts_active(self):
        return Post.objects.filter(is_active=True)

    def get_a_post_active(self, pk):
        return Post.objects.filter(is_active=True, pk=pk)

    def list(self, request):
        """
        Get all posts active.
        GET /api/v1/posts/
        """
        posts = self.get_all_posts_active()
        serialized_posts = PostSerializer(posts, many=True)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)

    @transaction.atomic
    @action(
        detail=True,
        methods=["POST"],
        url_path="like",
        url_name="like-post",
    )
    def like_post(self, request, pk=None):
        post = self.get_a_post_active(pk=pk)
        if post.exists():
            user = request.user
            like = Like.objects.filter(user=user, post=post.get())

            if like.exists():
                return Response(
                    {"message": "O Post já foi curtido."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            like_data = {
                "user": user.pk,
                "post": post.get().pk,
            }

            serializer = LikeSerializer(data=like_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"message": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND
        )

    @transaction.atomic
    @action(
        detail=True,
        methods=["POST"],
        url_path="deslike",
        url_name="deslike-post",
    )
    def deslike_post(self, request, pk=None):
        post = self.get_a_post_active(pk=pk)
        if post.exists():
            user = request.user
            deslike = Deslike.objects.filter(user=user, post=post.get())

            if deslike.exists():
                return Response(
                    {"message": "O Post já foi descurtido."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            deslike_data = {
                "user": user.pk,
                "post": post.get().pk,
            }

            serializer = DeslikeSerializer(data=deslike_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"message": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND
        )

    @transaction.atomic
    def retrieve(self, request, pk=None):
        """
        Get a post.
        GET /api/v1/posts/pk/
        """
        try:
            post = self.get_a_post_active(pk)
            if post.exists():
                serialized_post = PostSerializer(post.first())
                return Response(serialized_post.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "Post não encontrado."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @transaction.atomic
    def update(self, request, pk=None):
        """
        Update post.
        PUT /api/v1/posts/pk/
        """
        try:
            post = self.get_a_post_active(pk)
            if post.exists():
                if request.user != post.get().user:
                    return Response(
                        {"message": "Permissão negada."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                serializer = PostSerializer(
                    post.first(), data=request.data, partial=True
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(
                    {"message": "Post não encontrado."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete post.
        DELETE /api/v1/posts/pk/
        """
        try:
            post = self.get_a_post_active(pk)
            if post.exists():
                if request.user == post.get().user:
                    post.first().delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(
                        {"message": "Permissão negada."},
                        status=status.HTTP_403_FORBIDDEN,
                    )
            else:
                return Response(
                    {"message": "Post não encontrado."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
