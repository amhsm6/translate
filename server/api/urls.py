from django.urls import path

from .views import *

urlpatterns = [
    path('tasks/', TaskListView.as_view()),
    path('task/<pk>/', TaskView.as_view()),
    path('segment/<pk>/translate/<lang>/', TranslationView.as_view()),
    path('translation/<pk>/', TranslationEditView.as_view())
]
