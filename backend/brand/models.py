""" model for brands information """
from django.db import models



class Brand(models.Model):
    """ django brand model store name, url for sale calender """
    name = models.CharField(max_length=20)
    url = models.TextField(default="//:0")
    name_ko = models.CharField(max_length=20)

    def __str__(self):
        return self.name_ko
