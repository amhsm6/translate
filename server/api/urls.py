from django.urls import path

from .views import DocumentView

urlpatterns = [
    path('document/<int:pk>', DocumentView.as_view())
]
