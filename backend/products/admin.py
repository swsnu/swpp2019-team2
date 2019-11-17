from django.contrib import admin
from .lip.models import Lip, LipOption
from .base.models import Base, BaseOption
from .eye.models import Eyeliner, Eyeshadow, Mascara, Eyebrow, EyelinerOption, EyebrowOption, MascaraOption

admin.site.register(Lip)
admin.site.register(LipOption)
admin.site.register(Base)
admin.site.register(BaseOption)
admin.site.register(Eyeliner)
admin.site.register(EyelinerOption)
admin.site.register(Eyebrow)
admin.site.register(EyebrowOption)
admin.site.register(Mascara)
admin.site.register(MascaraOption)
admin.site.register(Eyeshadow)
