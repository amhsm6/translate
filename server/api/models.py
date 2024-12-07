import uuid
from django.db import models

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField()

class SourceSegment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, to_field='id', related_name='segments', on_delete=models.CASCADE)
    source = models.TextField()

class TargetSegment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.OneToOneField(SourceSegment, to_field='id', related_name='target', on_delete=models.CASCADE)
    text = models.TextField()
