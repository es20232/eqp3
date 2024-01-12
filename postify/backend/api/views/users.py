from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from ..models import User
from ..serializers import UserRegisterSerializer, UserSerializer


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

        return Response(status=status.HTTP_201_CREATED)


class UserViewSet(ViewSet):
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
    def destroy(self, request, pk=None):
        """
        Delete user.
        DELETE /api/v1/users/pk/
        """
        user = self.get_a_user_active(pk)
        if user.exists():
            user = user.get()
            user.request = request
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
        )
