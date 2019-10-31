from django.db import models

# Create your models here.

class Brand(models.Model):
    name = models.CharField(max_length=20)
    saledate = models.CharField(max_length=20)
    url = models.CharField(max_length=45)

class Lip(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    category = models.CharField(max_length=20)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    thumbnail = models.CharField(max_length=150)


class LipColor(models.Model):
    product = models.ForeignKey(
        Lip,
        on_delete=models.CASCADE)
    color = models.CharField(max_length = 10)