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
    translations = serializers.SerializerMethodField()

    class Meta:
        model = Segment
        fields = ['id', 'index', 'source', 'lang', 'translations']

    def get_translations(self, segment):
        if 'lang' in self.context:
            qs = segment.translations.filter(lang=self.context['lang'])
        else:
            qs = segment.translations.all()

        return TranslationSerializer(qs, many=True).data

class DocumentSerializer(serializers.ModelSerializer):
    segments = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['id', 'title', 'segments']

    def get_segments(self, obj):
        qs = obj.segments.order_by('index')
        return SegmentSerializer(qs, many=True, context=self.context).data

class TaskSerializer(serializers.ModelSerializer):
    document = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'source_lang', 'target_lang', 'document']

    def get_document(self, obj):
        self.context['lang'] = obj.target_lang
        return DocumentSerializer(obj.document, context=self.context).data

class TaskListSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'source_lang', 'target_lang']

    def get_title(self, obj):
        return obj.document.title
