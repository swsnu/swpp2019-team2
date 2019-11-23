""" ML model """
from django.db import models

# Create your models here.

class ML(models.Model):
    """ model for ML results """
    result = models.CharField(max_length=30)
    file = models.ImageField(blank=False, null=False)
    def __str__(self):
        return self.result
