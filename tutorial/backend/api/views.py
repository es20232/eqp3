from api.models import Produto
from api.serializers import ProdutoSerializer
from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


class ProdutoView(APIView):
    def get_produtos(self):
        return Produto.objects.all()

    def get(self, request, id=None):
        try:
            produtos = self.get_produtos().filter(id=id) if id else self.get_produtos()
            serializer = ProdutoSerializer(instance=produtos, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                data={"error": f"Erro ao listar os produtos: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @transaction.atomic
    def post(self, request):
        try:
            serializer = ProdutoSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                data={"error": f"Erro ao criar o produto: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @transaction.atomic
    def patch(self, request, id):
        try:
            produto = self.get_produtos().get(id=id)
            serializer = ProdutoSerializer(
                instance=produto, data=request.data, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                data={"error": f"Erro ao atualizar a imagem do produto: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @transaction.atomic
    def delete(self, request, id):
        try:
            produto = self.get_produtos().get(id=id)
            produto.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                data={"error": f"Erro ao deletar o produto: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
