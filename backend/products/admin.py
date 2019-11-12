from django.contrib import admin
from .lip.models import Lip, LipOption
from .base.models import Base, BaseOption

admin.site.register(Lip)
admin.site.register(LipOption)
admin.site.register(Base)
admin.site.register(BaseOption)
