from rest_framework import serializers

from ..models import Deslike
from .user_serializers import SimplifiedUserSerializer


class DeslikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deslike
        fields = "__all__"


class SimplifiedDeslikeSerializer(serializers.ModelSerializer):
    user = SimplifiedUserSerializer()

    class Meta:
        model = Deslike
        exclude = ["post"]
