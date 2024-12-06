from rest_framework import serializers

from .models import *

class TargetSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetSegment
        fields = ['pk', 'text']

class SourceSegmentSerializer(serializers.ModelSerializer):
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()

    class Meta:
        model = SourceSegment
        fields = ['pk', 'source', 'target']

    def get_source(self, obj):
        return obj.text

    def get_target(self, obj):
        target = TargetSegmentSerializer(obj.targetsegment)
        return target.data

class DocumentSerializer(serializers.ModelSerializer):
    segments = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['pk', 'title', 'segments']
    
    def get_segments(self, obj):
        segments = SourceSegmentSerializer(obj.sourcesegment_set, many=True)
        return segments.data
