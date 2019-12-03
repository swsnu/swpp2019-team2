"""MODELS"""
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Profile(models.Model):
    """PROFILE MODELS"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prefer_color = models.TextField(max_length=10, null=True, blank=True)
    prefer_base = models.TextField(null=True, blank=True)
    prefer_brand = models.TextField(null=True)
    nick_name = models.TextField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.user.username

# post_save 시그널을 받아 토큰을 생성한다.
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(instance=None, created=False, **kwargs):
    # pylint: disable=unused-argument
    """AUTH TOKEN"""
    if created:
        Token.objects.create(user=instance)
# Create your models here.
