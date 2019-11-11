"""MODELS"""
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



# post_save 시그널을 받아 토큰을 생성한다.
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(instance=None, created=False, **kwargs):
    """AUTH TOKEN"""
    if created:
        Token.objects.create(user=instance)
# Create your models here.

