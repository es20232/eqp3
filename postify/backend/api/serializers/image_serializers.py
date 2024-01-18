from rest_framework import exceptions, serializers

from ..models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = ["user"]
