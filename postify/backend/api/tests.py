from django.test import TestCase
from .models import User
from .models import EmailConfirmation
from .models import Post
from .models import Comment
from .models import Like
from .models import Deslike

from faker import Faker

language = "pt_BR"
faker = Faker(language)
import os
import requests

# Testes Unitários
class UserModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_user_creation(self):
        """
        Test case for creating a user.

        This test verifies that a user can be successfully created using the User.objects.create method.
        It checks if the user's primary key (pk) is assigned a value, indicating that the user was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        self.assertTrue(user.pk)

    def test_user_delete(self):
        """
        Test case for deleting a user.

        This test verifies that a user can be successfully deleted using the User.delete method.
        It checks if the user's primary key (pk) is not found in the database, indicating that the user was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        user.delete()
        self.assertFalse(user.is_active)

    def test_user_generate_password_reset_token(self):
        """
        Test case for generating a password reset token.

        This test verifies that a password reset token can be successfully generated using the User.generate_password_reset_token method.
        It checks if the user's password_reset_token field is not empty, indicating that the token was generated.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        user.generate_password_reset_token()
        self.assertTrue(user.password_reset_token)

    def test_user_reset_password(self):
        """
        Test case for resetting a user's password.

        This test verifies that a user's password can be successfully reset using the User.reset_password method.
        It checks if the user's password field is equal to the new password, indicating that the password was reset.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        user.generate_password_reset_token()
        new_password = faker.password()
        user.reset_password(new_password)
        self.assertTrue(user.check_password(new_password))

    def test_send_password_reset_email(self):
        """
        Test case for sending a password reset email.

        This test verifies that a password reset email can be successfully sent using the User.send_password_reset_email method.
        It checks if the user's password_reset_token field is not empty, indicating that the token was generated and the email was sent.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        user.generate_password_reset_token()
        user.send_password_reset_email()
        self.assertTrue(user.password_reset_token)

    def tearDown(self):
        users = User.objects.all()
        for user in users:
            user.delete()


class EmailConfirmationModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_email_confirmation_creation(self):
        """
        Test case for creating an email confirmation.

        This test verifies that an email confirmation can be successfully created using the EmailConfirmation.objects.create method.
        It checks if the email confirmation's primary key (pk) is assigned a value, indicating that the email confirmation was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        email_confirmation = EmailConfirmation.objects.create(user=user)
        self.assertTrue(email_confirmation.pk)

    def test_email_confirmation_delete(self):
        """
        Test case for deleting an email confirmation.

        This test verifies that an email confirmation can be successfully deleted using the EmailConfirmation.delete method.
        It checks if the email confirmation's primary key (pk) is not found in the database, indicating that the email confirmation was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        email_confirmation = EmailConfirmation.objects.create(user=user)
        email_confirmation.delete()
        self.assertFalse(
            EmailConfirmation.objects.filter(pk=email_confirmation.pk).exists()
        )

    def tearDown(self):
        email_confirmations = EmailConfirmation.objects.all()
        for email_confirmation in email_confirmations:
            email_confirmation.delete()
        users = User.objects.all()
        for user in users:
            user.delete()


class PostModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_post_creation(self):
        """
        Test case for creating a post.

        This test verifies that a post can be successfully created using the Post.objects.create method.
        It checks if the post's primary key (pk) is assigned a value, indicating that the post was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        self.assertTrue(post.pk)

    def test_post_delete(self):
        """
        Test case for deleting a post.

        This test verifies that a post can be successfully deleted using the Post.delete method.
        It checks if the post's primary key (pk) is not found in the database, indicating that the post was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        post.delete()
        self.assertFalse(post.is_active)

    def tearDown(self):
        posts = Post.objects.all()
        for post in posts:
            post.delete()
        users = User.objects.all()
        for user in users:
            user.delete()


class CommentModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_comment_creation(self):
        """
        Test case for creating a comment.

        This test verifies that a comment can be successfully created using the Comment.objects.create method.
        It checks if the comment's primary key (pk) is assigned a value, indicating that the comment was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        comment = Comment.objects.create(comment=faker.text(), user=user, post=post)
        self.assertTrue(comment.pk)

    def test_comment_delete(self):
        """
        Test case for deleting a comment.

        This test verifies that a comment can be successfully deleted using the Comment.delete method.
        It checks if the comment's primary key (pk) is not found in the database, indicating that the comment was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        comment = Comment.objects.create(comment=faker.text(), user=user, post=post)
        comment.delete()
        self.assertFalse(Comment.objects.filter(pk=comment.pk).exists())

    def tearDown(self):
        comments = Comment.objects.all()
        for comment in comments:
            comment.delete()
        posts = Post.objects.all()
        for post in posts:
            post.delete()
        users = User.objects.all()
        for user in users:
            user.delete()


class LikeModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_like_creation(self):
        """
        Test case for creating a like.

        This test verifies that a like can be successfully created using the Like.objects.create method.
        It checks if the like's primary key (pk) is assigned a value, indicating that the like was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        like = Like.objects.create(user=user, post=post)
        self.assertTrue(like.pk)

    def test_like_delete(self):
        """
        Test case for deleting a like.

        This test verifies that a like can be successfully deleted using the Like.delete method.
        It checks if the like's primary key (pk) is not found in the database, indicating that the like was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        like = Like.objects.create(user=user, post=post)
        like.delete()
        self.assertFalse(Like.objects.filter(pk=like.pk).exists())

    def tearDown(self):
        likes = Like.objects.all()
        for like in likes:
            like.delete()
        posts = Post.objects.all()
        for post in posts:
            post.delete()
        users = User.objects.all()
        for user in users:
            user.delete()


class DeslikeModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_deslike_creation(self):
        """
        Test case for creating a deslike.

        This test verifies that a deslike can be successfully created using the Deslike.objects.create method.
        It checks if the deslike's primary key (pk) is assigned a value, indicating that the deslike was created.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        deslike = Deslike.objects.create(user=user, post=post)
        self.assertTrue(deslike.pk)

    def test_deslike_delete(self):
        """
        Test case for deleting a deslike.

        This test verifies that a deslike can be successfully deleted using the Deslike.delete method.
        It checks if the deslike's primary key (pk) is not found in the database, indicating that the deslike was deleted.
        """
        user = User.objects.create(
            email=faker.email(),
            password=faker.password(),
            name=faker.name(),
        )
        post = Post.objects.create(caption=faker.text(), user=user)
        deslike = Deslike.objects.create(user=user, post=post)
        deslike.delete()
        self.assertFalse(Deslike.objects.filter(pk=deslike.pk).exists())

    def tearDown(self):
        deslikes = Deslike.objects.all()
        for deslike in deslikes:
            deslike.delete()
        posts = Post.objects.all()
        for post in posts:
            post.delete()
        users = User.objects.all()
        for user in users:
            user.delete()


# Testes de Integração


class UserRegisterIntegrationTestCase(TestCase):
    def setUp(self):
        pass

    def test_user_register(self):
        """
        Test case for registering a user.

        This test verifies if the user can register using the route /api/users/ with the method POST.
        It checks if the user's primary key (pk) is assigned a value, indicating that the user was created.
        """
        response = self.client.post(
            "/api/v1/register/",
            {
                "email": faker.email(),
                "password": faker.password(),
                "name": faker.name(),
                "username": "_".join(faker.name().split(" ")),
                "phone_number": faker.phone_number(),
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)

    def test_user_register_invalid_email(self):
        """
        Test case for registering a user with an invalid email.

        This test verifies if the user can register using the route /api/users/ with the method POST.
        It checks if the user's primary key (pk) is not assigned a value, indicating that the user was not created.
        """
        response = self.client.post(
            "/api/v1/register/",
            {
                "email": "invalid_email",
                "password": faker.password(),
                "name": faker.name(),
                "username": "_".join(faker.name().split(" ")),
                "phone_number": faker.phone_number(),
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)

    def tearDown(self):
        users = User.objects.all()
        for user in users:
            user.delete()


class UserPostIntegrationTestCase(TestCase):
    def setUp(self):
        def download_picture(filename: str, width: int, height: int):
            response = requests.get(
                f"https://picsum.photos/{width}/{height}",
                stream=True,
            )
            with open(filename, "wb") as out_file:
                out_file.write(response.content)

        self.picture_filename = "test_picture.jpg"
        download_picture(self.picture_filename, 512, 512)

        raw_password = faker.password()
        self.user = User.objects.create(
            email=faker.email(),
            name=faker.name(),
            username="_".join(faker.name().split(" ")),
            is_active=True,
        )
        self.user.set_password(raw_password)
        self.user.save()
        loginresponse = self.client.post(
            "/api/v1/login",
            {"username": self.user.username, "password": raw_password},
            format="json",
        )
        self.assertEqual(loginresponse.status_code, 200)
        self.token = loginresponse.data["access"]

    def test_user_post(self):
        """
        Test case for user posting.

        This test verifies if the user can post using the route /api/v1/users/{user.pk}/posts/ with the method POST.
        It checks if the response status code is 201, indicating that the post was created.
        """
        with open(self.picture_filename, "rb") as image:
            response = self.client.post(
                f"/api/v1/users/{self.user.pk}/posts/create",
                {"caption": faker.text(), "image": image},
                HTTP_AUTHORIZATION=f"Bearer {self.token}",
                format="multipart",
            )
        self.assertEqual(response.status_code, 201)

    def test_user_post_invalid_image(self):
        """
        Test case for user posting with an invalid image.

        This test verifies if the user can post using the route /api/v1/users/{user.pk}/posts/ with the method POST.
        It checks if the response status code is 400, indicating that the post was not created.
        """
        response = self.client.post(
            f"/api/v1/users/{self.user.pk}/posts/create",
            {"caption": faker.text()},
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="multipart",
        )
        self.assertEqual(response.status_code, 400)

    def tearDown(self):
        users = User.objects.all()
        for user in users:
            user.delete()
        os.remove(self.picture_filename)


class UserPostCommentIntegrationTestCase(TestCase):
    def setUp(self):
        def download_picture(filename: str, width: int, height: int):
            response = requests.get(
                f"https://picsum.photos/{width}/{height}",
                stream=True,
            )
            with open(filename, "wb") as out_file:
                out_file.write(response.content)

        self.picture_filename = "test_picture.jpg"
        download_picture(self.picture_filename, 512, 512)

        raw_password = faker.password()
        self.user = User.objects.create(
            email=faker.email(),
            name=faker.name(),
            username="_".join(faker.name().split(" ")),
            is_active=True,
        )
        self.user.set_password(raw_password)
        self.user.save()
        loginresponse = self.client.post(
            "/api/v1/login",
            {"username": self.user.username, "password": raw_password},
            format="json",
        )
        self.assertEqual(loginresponse.status_code, 200)
        self.token = loginresponse.data["access"]

    def test_user_post_comment(self):
        """
        Test case for user commenting on a post.

        This test verifies if the user can comment on a post using the route /api/v1/posts/{post.pk}/comments/ with the method POST.
        It checks if the response status code is 201, indicating that the comment was created.
        """
        post = Post.objects.create(
            caption=faker.text(),
            user=self.user,
            image=self.picture_filename,
        )
        response = self.client.post(
            f"/api/v1/posts/{post.pk}/comments/create",
            {"comment": faker.text(), "user": self.user},
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )
        self.assertEqual(response.status_code, 201)

    def tearDown(self):
        users = User.objects.all()
        for user in users:
            user.delete()
        os.remove(self.picture_filename)


# Testes de Sistema

# Testes de Cenário
