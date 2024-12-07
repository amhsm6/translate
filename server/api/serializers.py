from rest_framework import serializers

from .models import *

class TargetSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetSegment
        fields = ['id', 'text']

class SourceSegmentSerializer(serializers.ModelSerializer):
    target = TargetSegmentSerializer()

    class Meta:
        model = SourceSegment
        fields = ['id', 'source', 'target']

class DocumentSerializer(serializers.ModelSerializer):
    segments = SourceSegmentSerializer(many=True)

    class Meta:
        model = Document
        fields = ['id', 'title', 'segments']

class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title']
