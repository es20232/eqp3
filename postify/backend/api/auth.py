from api.models import User
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import AuthenticationFailed


class UserBackend(ModelBackend):
    def authenticate(self, request, email, password):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                update_last_login(None, user)
                return user
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid email or password.")
