from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(assigned_to=self.request.user)

class DocumentView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()

        lang = self.kwargs.pop('lang')
        context['lang'] = lang

        return context

class TranslationView(APIView):
    def post(self, request, pk, lang):
        segment = get_object_or_404(Segment, pk=pk)

        if segment.document.assigned_to != request.user:
            raise PermissionDenied

        serializer = TranslationSerializer(data={**request.data, 'lang': lang}, context={'segment': segment})
        serializer.is_valid(raise_exception=True)
        serializer.save(segment=segment)

        return Response(serializer.data)

class TranslationEditView(generics.UpdateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer

    def update(self, request, *args, **kwargs):
        translation = self.get_object()

        if translation.segment.document.assigned_to != request.user:
            raise PermissionDenied

        return super().update(request, *args, **kwargs)
