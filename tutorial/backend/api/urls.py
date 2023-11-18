from api.views import ProdutoView
from django.urls import path

app_name = "api"

urlpatterns = [
    path("produtos/", ProdutoView.as_view(), name="produtos-list"),
    path("produtos/<int:id>/", ProdutoView.as_view(), name="produtos-detail"),
]
