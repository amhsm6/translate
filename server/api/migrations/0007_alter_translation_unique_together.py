# Generated by Django 4.2 on 2025-01-08 19:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_segment_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='translation',
            unique_together={('segment', 'lang')},
        ),
    ]
