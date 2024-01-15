from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Post


class PostViewSet(ViewSet):
    # TODO: Retirar comentario para utilizar a autenticação
    # permission_classes = [IsAuthenticated]

    def get_all_posts_active(self):
        return Post.objects.filter(is_active=True)

    def get_a_post_active(self, pk):
        return Post.objects.filter(is_active=True, pk=pk)

    def list(self, request):
        """
        Get all posts active.
        GET /api/v1/posts/
        """
        pass

    @transaction.atomic
    def create(self, request):
        """
        Create post.
        POST /api/v1/posts/
        """
        pass

    def retrieve(self, request, pk=None):
        """
        Get a post.
        GET /api/v1/posts/pk/
        """
        pass

    @transaction.atomic
    def update(self, request, pk=None):
        """
        Update post.
        PUT /api/v1/posts/pk/
        """
        pass

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete post.
        DELETE /api/v1/posts/pk/
        """
        pass
