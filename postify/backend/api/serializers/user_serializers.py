from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..models import User


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if user and user.is_active:
                refresh = self.get_token(user)

                data = {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }

                return data
            else:
                raise exceptions.AuthenticationFailed("Login ou senha inválidos.")
        else:
            raise exceptions.AuthenticationFailed("Login e senha são obrigatórios.")

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["name"] = user.name
        token["email"] = user.email
        token["username"] = user.username
        token["phone_number"] = user.phone_number
        token["profile_image"] = user.profile_image.url if user.profile_image else ""

        return token


class UserRegisterSerializer(serializers.ModelSerializer):
    def validate_password(self, password):
        return make_password(password)

    class Meta:
        model = User
        fields = "__all__"


class SimplifiedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "name",
            "email",
            "profile_image",
            "biography",
            "phone_number",
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password", "is_active"]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
