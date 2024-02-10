from rest_framework import serializers

from ..models import Comment, Deslike, Like, Post
from .comment_serializers import SimplifiedCommentSerializer
from .deslike_serializers import SimplifiedDeslikeSerializer
from .like_serializers import SimplifiedLikeSerializer
from .user_serializers import SimplifiedUserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = SimplifiedUserSerializer()
    likes = serializers.SerializerMethodField()
    deslikes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_likes(self, obj):
        likes = Like.objects.filter(post=obj)
        return SimplifiedLikeSerializer(likes, many=True).data

    def get_deslikes(self, obj):
        deslikes = Deslike.objects.filter(post=obj)
        return SimplifiedDeslikeSerializer(deslikes, many=True).data

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        return SimplifiedCommentSerializer(comments, many=True).data


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
