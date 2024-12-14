from django.http import Http404
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

class DocumentFullView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentListSerializer

class DocumentView(APIView):
    def get(self, request, pk, lang):
        try:
            document = Document.objects.all().prefetch_related(
                Prefetch('segments__translations', Translation.objects.filter(lang=lang))
            ).get(pk=pk)
            print('view', list(map(lambda seg: seg.translations.all(), document.segments.all())))

            serializer = DocumentSerializer(document)
            return Response(serializer.data)

        except Document.DoesNotExist:
            raise Http404

class TranslationView(APIView):
    def post(self, request, pk, lang):
        segment = get_object_or_404(Segment, pk=pk)

        serializer = TranslationSerializer(data={**request.data, 'lang': lang}, context={'segment': segment})
        serializer.is_valid(raise_exception=True)
        serializer.save(segment=segment)

        return Response()
