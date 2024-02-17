from django.http import Http404
from django.utils import timezone
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import User
from ..serializers.password_serializers import PasswordResetRequestSerializer


class PasswordResetRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
                user.send_password_reset_email()
                return Response(
                    {"message": "E-mail enviado com sucesso."},
                    status=status.HTTP_200_OK,
                )
            except User.DoesNotExist:
                return Response(
                    {"error": "Usuário não encontrado."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    lookup_field = "password_reset_token"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        token_from_url = kwargs.get("password_reset_token")

        if (
            instance.password_reset_token == token_from_url
            and instance.reset_token_expires_at > timezone.now()
            and instance.reset_token_expires_at
            <= timezone.now() + timezone.timedelta(hours=1)
        ):
            new_password = request.data["new_password"]
            instance.reset_password(new_password)
            return Response(
                {"message": "Senha redefinida com sucesso."}, status=status.HTTP_200_OK
            )
        else:
            raise Http404("Token de redefinição de senha inválido ou expirado.")
