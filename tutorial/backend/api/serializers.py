from rest_framework import serializers
from .models import Produto


class ProdutoSerializer(serializers.ModelSerializer):
    imagem = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Produto
        fields = "__all__"
