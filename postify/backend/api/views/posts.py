from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Image, Like, Post, User
from ..serializers.like_serializers import LikeSerializer
from ..serializers.post_serializers import CreatePostSerializer, PostSerializer


class CreatePostViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

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
        image = Image.objects.filter(pk=request.data["image"])
        if user.exists() and image.exists():
            post_data = {
                "image": image.get().pk,
                "user": user.get().pk,
                "caption": request.data["caption"],
            }
            serializer = CreatePostSerializer(data=post_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"message": "User/Image not found."}, status=status.HTTP_404_NOT_FOUND
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
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
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
                like.get().delete()
                return Response(status=status.HTTP_200_OK)

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
            {"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND
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
                    {"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
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
                serializer = PostSerializer(post.first(), data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(post=request.data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(
                    {"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
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
                post.first().delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(
                    {"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
