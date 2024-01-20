from rest_framework import serializers

from ..models import Comment, Like, Post
from .comment_serializers import SimplifiedCommentSerializer
from .image_serializers import ImageSerializer
from .like_serializers import SimplifiedLikeSerializer
from .user_serializers import SimplifiedUserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = SimplifiedUserSerializer()
    image = ImageSerializer()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_likes(self, obj):
        likes = Like.objects.filter(post=obj)
        return SimplifiedLikeSerializer(likes, many=True).data

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        return SimplifiedCommentSerializer(comments, many=True).data


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
