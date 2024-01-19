from rest_framework import exceptions, serializers

from ..models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        exclude = ["user"]
      