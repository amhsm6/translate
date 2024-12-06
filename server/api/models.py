from django.db import models

class Document(models.Model):
    title = models.CharField()

class SourceSegment(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    text = models.TextField()

class TargetSegment(models.Model):
    source = models.OneToOneField(SourceSegment, on_delete=models.CASCADE)
    text = models.TextField()
