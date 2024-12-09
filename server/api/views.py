import time
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from .models import *
from .serializers import *

class DocumentView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get(self, request, *args, **kwargs):
        time.sleep(2)
        return self.retrieve(request, *args, **kwargs)

class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentListSerializer

class SourceSegmentTranslateView(APIView):
    def post(self, request, pk):
        if 'text' not in request.data: # TODO: make validator
            raise ParseError()

        text = request.data['text']

        source = SourceSegment.objects.get(pk=pk)
        target = TargetSegment(source=source, text=text)
        target.save()

        return Response()

class TargetSegmentUpdateView(generics.UpdateAPIView):
    queryset = TargetSegment.objects.all()
    serializer_class = TargetSegmentSerializer
