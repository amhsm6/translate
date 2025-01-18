from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(assigned_to=self.request.user)

class TaskView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def retrieve(self, request, *args, **kwargs):
        task = self.get_object()

        if task.assigned_to != request.user:
            raise PermissionDenied

        return super().retrieve(request, *args, **kwargs)

class TranslationView(APIView):
    def post(self, request, pk, lang):
        segment = get_object_or_404(Segment, pk=pk)

        if not segment.document.tasks.filter(assigned_to=request.user, source_lang=segment.lang, target_lang=lang).exists():
            raise PermissionDenied

        serializer = TranslationSerializer(data={ **request.data, 'lang': lang }, context={ 'segment': segment })
        serializer.is_valid(raise_exception=True)
        serializer.save(segment=segment)

        return Response(serializer.data)

class TranslationEditView(generics.UpdateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer

    def update(self, request, *args, **kwargs):
        translation = self.get_object()

        if not translation.segment.document.tasks.filter(assigned_to=request.user, source_lang=translation.segment.lang, target_lang=translation.lang).exists():
            raise PermissionDenied

        return super().update(request, *args, **kwargs)
