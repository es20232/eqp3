from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Image


class ImageViewSet(ViewSet):
    # TODO: Retirar comentario para utilizar a autenticação
    # permission_classes = [IsAuthenticated]

    def get_all_images(self):
        return Image.objects.all()

    def get_a_image(self, pk):
        return Image.objects.filter(pk=pk)

    def list(self, request):
        """
        Get all posts active.
        GET /api/v1/posts/
        """
        pass

    @transaction.atomic
    def create(self, request):
        """
        Create image.
        POST /api/v1/images/
        """
        pass

    def retrieve(self, request, pk=None):
        """
        Get a image.
        GET /api/v1/images/pk/
        """
        pass

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete image.
        DELETE /api/v1/images/pk/
        """
        pass
