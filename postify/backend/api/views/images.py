from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import parsers

from ..models import Image, User
from ..serializers.image_serializers import ImageSerializer


class ImageViewSet(ViewSet):
    # TODO: Retirar comentario para utilizar a autenticação
    # permission_classes = [IsAuthenticated]
    parser_classes = [parsers.MultiPartParser]

    def get_all_images(self):
        return Image.objects.all()

    def get_a_image(self, pk):
        return Image.objects.filter(pk=pk)

    def list(self, request):
        """
        Get all posts active.
        GET /api/v1/posts/
        """
        images = self.get_all_images()
        data = ImageSerializer(images, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)

    @transaction.atomic
    def create(self, request):
        """
        Create image.
        POST /api/v1/images/
        """
        # Get the user from the request
        user = request.data.get("user")
        if user is None:
            return Response(
                {"message": "User wasn't provided."}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.filter(pk=user)
        if user.exists() is False:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        # Get the file from the multipart request
        content = request.FILES['file']
        if content is None:
            return Response(
                {"message": "Image wasn't provided."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the image
        image = Image.objects.create(image=content, user=user.get())
        data = ImageSerializer(image).data
        return Response(data=data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        """
        Get a image.
        GET /api/v1/images/pk/
        """
        image = self.get_a_image(pk)
        if image.exists():
            data = ImageSerializer(image.first()).data
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Image not found."}, status=status.HTTP_404_NOT_FOUND
            )

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
