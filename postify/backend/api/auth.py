from datetime import timedelta

from api.models import User
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import update_last_login
from django.utils import timezone
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied


class UserBackend(ModelBackend):
    def authenticate(self, request, username, password):
        try:
            user = User.objects.get(username=username)
            print(user)

            if user.login_attempts >= 3 and user.last_login_attempt:
                time_since_last_attempt = timezone.now() - user.last_login_attempt
                if time_since_last_attempt < timedelta(minutes=5):
                    raise PermissionDenied(
                        "Conta bloqueada. Tente novamente mais tarde."
                    )

            if user.check_password(password):
                user.login_attempts = 0
                user.save()

                update_last_login(None, user)
                return user
            else:
                user.login_attempts += 1
                user.last_login_attempt = timezone.now()
                user.save()
        except User.DoesNotExist:
            raise AuthenticationFailed("Login ou senha inválidos.")
