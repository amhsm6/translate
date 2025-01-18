from django.contrib import admin

from .models import *

admin.site.register(Task)
admin.site.register(Document)
admin.site.register(Segment)
admin.site.register(Translation)
