"""MODELS"""
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
#from django.contrib.auth.models import User
#import json
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



# post_save 시그널을 받아 토큰을 생성한다.
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(instance=None, created=False, **kwargs):
    """AUTH TOKEN"""
    if created:
        Token.objects.create(user=instance)
# Create your models here.



class Brand(models.Model):
    """BRAND"""
    name = models.CharField(max_length=20)
    saledate = models.CharField(max_length=20)
    url = models.CharField(max_length=45)

    # def __str__(self):
    #     return self.name



class ColorRange(models.Model):
    """COLOR"""
    name = models.CharField(max_length=20)
    range = models.CharField(max_length=20)

class Lip(models.Model):
    """LIP"""
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    category = models.CharField(max_length=20)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    color = models.ForeignKey(ColorRange, on_delete=models.CASCADE)
    thumbnail = models.CharField(max_length=150)


    def __str__(self):
        return self.brand.name
