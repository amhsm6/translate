# Generated by Django 4.2 on 2024-12-14 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_segment_translation_remove_targetsegment_source_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='segment',
            name='index',
            field=models.IntegerField(unique=True),
        ),
    ]
