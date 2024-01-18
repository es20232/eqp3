from django.db import transaction
from rest_framework import parsers, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import Image, User
from ..serializers.image_serializers import ImageSerializer


class CreateImageViewSet(ViewSet):
    @transaction.atomic
    @action(
        detail=True,
        methods=["POST"],
        url_path="images/upload",
        url_name="image-upload",
    )
    def image_upload(self, request, pk=None):
        """
        Create image.
        POST /api/v1/users/pk/images/upload
        """
        user = User.objects.filter(pk=pk, is_active=True)
        if user.exists():
            image = request.FILES["image"]
            if image is None:
                return Response(
                    {"message": "Image wasn't provided."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            image = Image.objects.create(image=image, user=user.get())
            data = ImageSerializer(image).data
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class ImagesFromUserViewSet(ViewSet):
    @action(
        detail=True,
        methods=["GET"],
        url_path="images",
        url_name="user-images",
    )
    def images_from_user(self, request, pk=None):
        """
        Get all images from active user.
        GET /api/v1/posts/
        """
        user = User.objects.filter(pk=pk, is_active=True)
        if user.exists():
            images = Image.objects.filter(user=user.get())
            data = ImageSerializer(images, many=True).data
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class ImageViewSet(ViewSet):
    # TODO: Retirar comentario para utilizar a autenticação
    # permission_classes = [IsAuthenticated]
    parser_classes = [parsers.MultiPartParser]

    def get_a_image(self, pk):
        return Image.objects.filter(pk=pk)

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete image.
        DELETE /api/v1/images/pk/
        """
        image = self.get_a_image(pk)
        if image.exists():
            image = image.get()
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {"message": "Image not found."}, status=status.HTTP_404_NOT_FOUND
            )
