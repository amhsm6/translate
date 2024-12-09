import time
from rest_framework import generics

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

class TargetSegmentUpdateView(generics.UpdateAPIView):
    queryset = TargetSegment.objects.all()
    serializer_class = TargetSegmentSerializer
