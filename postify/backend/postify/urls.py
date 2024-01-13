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
router.register(r"posts", PostViewSet, basename="post")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((router.urls, "api"), namespace="postify")),
    path("api/v1/login", UserTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/refresh", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
