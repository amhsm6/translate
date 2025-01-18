from django.contrib.auth import get_user_model
from django.db import models
import uuid

User = get_user_model()

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField()

class Segment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, related_name='segments', on_delete=models.CASCADE)
    index = models.IntegerField()
    source = models.TextField()
    lang = models.CharField()

    class Meta:
        unique_together = ['document', 'index']

class Translation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    segment = models.ForeignKey(Segment, related_name='translations', on_delete=models.CASCADE)
    target = models.TextField()
    lang = models.CharField()

    class Meta:
        unique_together = ['segment', 'lang']

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, related_name='tasks', on_delete=models.CASCADE)
    source_lang = models.CharField()
    target_lang = models.CharField()
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
