from django.db import models

# Create your models here.

class Lip(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()