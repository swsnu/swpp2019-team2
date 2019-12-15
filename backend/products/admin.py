""" django admin page setting """
from django.contrib import admin
from .lip.models import Lip, LipOption
from .base.models import Base, BaseOption
from .cheek.models import Cheek, CheekOption

admin.site.register(Lip)
admin.site.register(LipOption)
admin.site.register(Base)
admin.site.register(BaseOption)
admin.site.register(Cheek)
admin.site.register(CheekOption)
