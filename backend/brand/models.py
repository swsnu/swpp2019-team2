from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=20)
    url = models.TextField(default="//:0")

    def __str__(self):
        return self.name