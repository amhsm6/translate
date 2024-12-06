from rest_framework import generics

from .models import Document
from .serializers import DocumentSerializer

class DocumentView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
