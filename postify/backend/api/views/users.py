from django.contrib.auth import update_session_auth_hash
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import EmailConfirmation, User
from ..serializers.users_serializers import (
    ChangePasswordSerializer,
    UserRegisterSerializer,
    UserSerializer,
    UserTokenObtainPairSerializer,
)
from ..utils.email.sender import send_confirmation_email


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserRegisterViewSet(ViewSet):
    @transaction.atomic
    def create(self, request):
        """
        Create user.
        POST /api/v1/register/
        """
        user = request.data

        user_serializer = UserRegisterSerializer(data=user)
        if user_serializer.is_valid():
            user = user_serializer.save()
        else:
            return Response(
                data=user_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        # TODO: Tirar comentário para validar email
        # send_confirmation_email(user=user)
        return Response(status=status.HTTP_201_CREATED)


class ConfirmEmailView(ViewSet):
    @transaction.atomic()
    def retrieve(self, request, pk):
        confirmation = get_object_or_404(EmailConfirmation, code=pk)

        if not confirmation.confirmed_at:
            confirmation.confirmed_at = timezone.now()
            confirmation.user.is_active = True
            confirmation.user.save()
            confirmation.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def get_all_users_active(self):
        return User.objects.filter(is_active=True)

    def get_a_user_active(self, pk):
        return User.objects.filter(is_active=True, pk=pk)

    def list(self, request):
        """
        Get all users.
        GET /api/v1/users/
        """
        users = self.get_all_users_active()
        data = UserSerializer(users, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        """
        Get a user.
        GET /api/v1/users/pk/
        """
        user = self.get_a_user_active(pk)
        if user.exists():
            user = user.get()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

    @transaction.atomic
    def update(self, request, pk=None):
        """
        Update user.
        PUT /api/v1/users/pk/
        """
        user = self.get_a_user_active(pk)
        if user.exists():
            user = user.get()
            user.request = request
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    @action(
        detail=False,
        methods=["POST"],
        url_path="change-password",
        url_name="change-password",
    )
    def change_password(self, request):
        """
        Change password of a user.
        DELETE /api/v1/users/change-password/
        """

        user = self.request.user
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.validated_data["old_password"]
            new_password = serializer.validated_data["new_password"]

            if not user.check_password(old_password):
                return Response(
                    {"error": "Senha antiga incorreta."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)

            return Response(
                {"message": "Senha alterada com sucesso."}, status=status.HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def destroy(self, request, pk=None):
        """
        Delete user.
        DELETE /api/v1/users/pk/
        """
        user = self.get_a_user_active(pk)
        if user.exists():
            user = user.get()
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
        )
