from django.db import models
from brand import models as brand_models
# Create your models here.

class Lip(models.Model):
    STICK = 'S'
    GLOSS = 'G'
    BALM = 'B'
    TINT = 'T'
    CATEGORY = (
        (STICK,'Stick'),
        (GLOSS,'Gloss'),
        (BALM,'Balm'),
        (TINT,'Tint'),
    )
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    brand = models.ForeignKey(
        brand_models.Brand,
        on_delete=models.CASCADE
    )
    category = models.CharField(
        max_length=1,
        choices=CATEGORY,
    )
    img_url = models.TextField(default="//:0")

    def __str__(self):
        return self.name

class LipOption(models.Model):
    RED = "RD"
    CORAL = "CR"
    PINK = "PK"
    ORANGE = "OR"
    COLOR = (
        (RED , "Red"),
        (CORAL , "Coral"),
        (PINK, "Pink"),
        (ORANGE, "Orange"),
    )
    color = models.CharField(
        max_length=2,
        choices=COLOR
    )
    optionName = models.CharField(max_length = 30)
    product = models.ForeignKey(
        Lip,
        on_delete=models.CASCADE
    )