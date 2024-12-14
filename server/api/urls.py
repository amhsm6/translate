from django.urls import path

from .views import *

urlpatterns = [
    path('documents/', DocumentListView.as_view()),
    path('document/<str:pk>/', DocumentView.as_view()),
    path('segment/<str:pk>/translate/<str:lang>/', TranslationView.as_view())
]
