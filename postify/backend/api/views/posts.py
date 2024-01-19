from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Post
from ..serializers.post_serializers import PostSerializer

class PostViewSet(ViewSet):
    # TODO: Retirar comentario para utilizar a autenticação
    permission_classes = [IsAuthenticated]

    def get_all_posts_active(self):
        return Post.objects.filter(is_active=True)

    def get_a_post_active(self, pk):
        return Post.objects.filter(is_active=True, pk=pk)

    @transaction.atomic
    @action(
        detail=False,
        methods=["GET"],
        url_path="posts",
        url_name="list-posts",
    )
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
        url_path="posts",
        url_name="create-post",
    )
    def create(self, request):
        """
        Create post.
        POST /api/v1/posts/
        """
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    @action(
        detail=True,
        methods=["GET"],
        url_path="posts/pk",
        url_name="retrieve-post",
    )
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
                        return Response({"detail": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    @action(
        detail=True,
        methods=["PUT"],
        url_path="posts/pk",
        url_name="update-post",
    )
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
                    return Response({"detail": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @transaction.atomic
    @action(
        detail=True,
        methods=["DELETE"],
        url_path="posts/pk",
        url_name="destroy-post",
    )
    def destroy(self, request, pk=None):
        """
        Delete post.
        DELETE /api/v1/posts/pk/
        """
        try:
            post = self.get_a_post_active(pk)
            if post.exists():
                post.first().delete()
                return Response({"detail": "Post deletado."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"detail": "Post não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)