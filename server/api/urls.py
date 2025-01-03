from django.urls import path

from .views import *

urlpatterns = [
    path('documents/', DocumentListView.as_view()),
    path('document/<pk>/', DocumentFullView.as_view()),
    path('document/<pk>/<lang>/', DocumentView.as_view()),
    path('segment/<pk>/translate/<lang>/', TranslationView.as_view()),
    path('translation/<pk>/', TranslationEditView.as_view()),
]
