from rest_framework import serializers

from ..models import Comment
from .user_serializers import SimplifiedUserSerializer


class SimplifiedCommentSerializer(serializers.ModelSerializer):
    user = SimplifiedUserSerializer()

    class Meta:
        model = Comment
        exclude = ["post"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
