from django.db import models
import uuid

# FIXME: make index and lang fields unique on the model level

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField()

class Segment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, related_name='segments', on_delete=models.CASCADE)
    index = models.IntegerField()
    source = models.TextField()
    lang = models.CharField()

class Translation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    segment = models.ForeignKey(Segment, related_name='translations', on_delete=models.CASCADE)
    target = models.TextField()
    lang = models.CharField()
