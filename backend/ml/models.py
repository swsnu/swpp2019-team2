""" ML model """
from django.db import models
# from products.base import models as product_models
# Create your models here.

class ML(models.Model):
    """ model for ML results """
    user_id = models.CharField(max_length=30, default="NONE")
    result = models.CharField(max_length=30, default="NONE")
    image = models.ImageField(upload_to='images')
    base = models.CharField(max_length=100, default="NONE")
