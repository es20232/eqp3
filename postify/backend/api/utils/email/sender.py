from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse

from ...models import EmailConfirmation


def send_confirmation_email(user):
    confirmation = EmailConfirmation.objects.create(user=user)

    subject = "Confirme seu cadastro - Postify"
    message = f'Clique no link para confirmar seu cadastro: {settings.DEFAULT_DOMAIN + reverse("api:confirm-email-detail", args=[str(confirmation.code)])}'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)
