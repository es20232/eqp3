from rest_framework import serializers

from ..models import Image


class UploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = ["user"]
