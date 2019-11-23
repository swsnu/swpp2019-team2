""" ML model """
from django.db import models

# Create your models here.

class ML(models.Model):
    """ model for ML results """
    user_id = models.CharField(max_length=30,default="NONE")
    result = models.CharField(max_length=30)
    file = models.ImageField(blank=False, null=False)
    def __str__(self):
        return str(self.user_id + self.result)
