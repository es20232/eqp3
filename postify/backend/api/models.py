from django.contrib.auth.models import AbstractBaseUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from PIL import Image as PILImage


def validate_image_format(image):
    valid_formats = ["JPEG", "JPG", "PNG"]
    img = PILImage.open(image)

    if img.format.upper() not in valid_formats:
        raise ValidationError(
            "Invalid image format. Only JPEG, JPG, and PNG are allowed."
        )


class User(AbstractBaseUser):
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"

    name = models.CharField(max_length=255, null=False)
    username = models.CharField(max_length=255, null=False)
    email = models.EmailField(unique=True, null=False)
    biography = models.CharField(max_length=255, null=True, blank=True)
    profile_image = models.ImageField(null=True, validators=[validate_image_format])
    phone_number = models.CharField(max_length=255, null=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    excluded_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk and self.profile_image:
            self.profile_image.name = (
                f"{self.id}/{self.profile_image.name.split('.')[0]}.%s"
                % self.profile_image.name.split(".")[1]
            )
        return super(User, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.excluded_at = timezone.now()
        self.is_active = False
        self.save(update_fields=["excluded_at", "is_active"])


class Image(models.Model):
    image = models.ImageField(validators=[validate_image_format])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.image.name = (
                f"{self.user.id}/{self.image.name.split('.')[0]}.%s"
                % self.image.name.split(".")[1]
            )
        return super(Image, self).save(*args, **kwargs)


class Post(models.Model):
    caption = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.OneToOneField(Image, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    excluded_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.image and self.image.post_set.exists():
            raise ValidationError("This image has already been used in a post.")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.excluded_at = timezone.now()
        self.is_active = False
        self.save(update_fields=["excluded_at", "is_active"])


class Comment(models.Model):
    comment = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    excluded_at = models.DateTimeField(null=True, blank=True)

    def delete(self, *args, **kwargs):
        self.excluded_at = timezone.now()
        self.is_active = False
        self.save(update_fields=["excluded_at", "is_active"])


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Deslike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
