""" model for lip cosmetic information """
from django.db import models
from brand import models as brand_models
# Create your models here.


class Lip(models.Model):
    """ django lip model """
    STICK = 'S'
    GLOSS = 'G'
    BALM = 'B'
    TINT = 'T'
    CATEGORY = (
        (STICK, 'Stick'),
        (GLOSS, 'Gloss'),
        (BALM, 'Balm'),
        (TINT, 'Tint'),
    )
    MATTE = 'M'
    GLOSSY = 'G'
    NONE = 'N'
    FORM = (
        (MATTE, 'Matte'),
        (GLOSSY, 'Glossy'),
        (NONE, 'None')
    )
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    brand = models.ForeignKey(
        brand_models.Brand,
        on_delete=models.CASCADE
    )
    form = models.CharField(
        max_length=1,
        choices=FORM,
        default=NONE
    )
    category = models.CharField(
        max_length=1,
        choices=CATEGORY,
    )
    product_url = models.CharField(
        max_length=255,
        default="//:0",
    )
    img_url = models.CharField(
        max_length=255,
        default="//:0",
    )

    def __str__(self):
        return self.name


class LipOption(models.Model):
    """ option of django lip model """
    RED = "RD"
    PINK = "PK"
    ORANGE = "OR"
    PURPLE = "PU"
    COLOR = (
        (RED, "Red"),
        (PINK, "Pink"),
        (ORANGE, "Orange"),
        (PURPLE, "Purple"),
    )
    color = models.CharField(
        max_length=2,
        choices=COLOR
    )
    sub_color = models.CharField(
        max_length=30
    )
    color_hex = models.CharField(max_length=10)
    optionName = models.CharField(max_length=30)
    product = models.ForeignKey(
        Lip,
        related_name='color',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.product) + " " + self.optionName
