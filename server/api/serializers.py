from rest_framework import serializers, validators

from .models import *

class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ['id', 'target', 'lang']

    def validate_lang(self, value):
        segment = self.context['segment']

        if segment.translations.filter(lang=value).exists():
            raise validators.ValidationError('Translation for this language already exists')

        return value

class SegmentSerializer(serializers.ModelSerializer):
    translations = TranslationSerializer(many=True)

    class Meta:
        model = Segment
        fields = ['id', 'index', 'source', 'lang', 'translations']

    # TODO: add validators for uniqueness of index and consistency of lang within the document

class DocumentSerializer(serializers.ModelSerializer):
    segments = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['id', 'title', 'segments']

    def get_segments(self, obj):
        qs = obj.segments.all().order_by('index')
        print('ser', list(map(lambda seg: seg.translations.all(), qs)))
        return SegmentSerializer(qs, many=True).data

class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title']
