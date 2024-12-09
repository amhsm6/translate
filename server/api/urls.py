from django.urls import path

from .views import *

urlpatterns = [
    path('documents/', DocumentListView.as_view()),
    path('document/<str:pk>/', DocumentView.as_view()),
    path('source/<str:pk>/translate/', SourceSegmentTranslateView.as_view()),
    path('target/<str:pk>/', TargetSegmentUpdateView.as_view())
]
