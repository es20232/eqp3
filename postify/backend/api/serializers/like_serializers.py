from rest_framework import serializers

from ..models import Like
from .user_serializers import SimplifiedUserSerializer


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class SimplifiedLikeSerializer(serializers.ModelSerializer):
    user = SimplifiedUserSerializer()

    class Meta:
        model = Like
        exclude = ["post"]
