"""
URL configuration for postify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from api.views import (
    CommentsFromPostViewSet,
    CommentViewSet,
    ConfirmEmailView,
    CreateCommentViewSet,
    CreateImageViewSet,
    CreatePostViewSet,
    ImagesFromUserViewSet,
    ImageViewSet,
    PostsFromUserViewSet,
    PostViewSet,
    UserRegisterViewSet,
    UserTokenObtainPairView,
    UserViewSet,
)
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"register", UserRegisterViewSet, basename="register")
router.register(r"register/confirm-email", ConfirmEmailView, basename="confirm-email")
router.register(r"posts", PostViewSet, basename="post")
router.register(r"images", ImageViewSet, basename="image")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((router.urls, "api"), namespace="postify")),
    path(
        "api/v1/users/<int:pk>/images/upload",
        CreateImageViewSet.as_view({"post": "image_upload"}),
        name="user_image_upload",
    ),
    path(
        "api/v1/users/<int:pk>/images",
        ImagesFromUserViewSet.as_view({"get": "images_from_user"}),
        name="user_images",
    ),
    path(
        "api/v1/users/<int:pk>/posts/create",
        CreatePostViewSet.as_view({"post": "create_post"}),
        name="user_post_create",
    ),
    path(
        "api/v1/users/<int:pk>/posts",
        PostsFromUserViewSet.as_view({"get": "posts_from_user"}),
        name="user_posts",
    ),
    path(
        "api/v1/posts/<int:pk>/comments/create",
        CreateCommentViewSet.as_view({"post": "comment_on_post"}),
        name="user_post_create",
    ),
    path(
        "api/v1/posts/<int:pk>/comments",
        CommentsFromPostViewSet.as_view({"get": "post_comments"}),
        name="post_comments",
    ),
    path("api/v1/login", UserTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/refresh", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
