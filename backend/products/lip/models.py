""" model for lip cosmetic information """
from django.db import models
from brand import models as brand_models
# Create your models here.


class Lip(models.Model):
    """ django lip model """
    STICK = 'LIP_S'
    GLOSS = 'LIP_G'
    BALM = 'LIP_B'
    TINT = 'LIP_T'
    CATEGORY = (
        (STICK, 'Stick'),
        (GLOSS, 'Gloss'),
        (BALM, 'Balm'),
        (TINT, 'Tint'),
    )
    MATTE = 'LIP_M'
    GLOSSY = 'LIP_G'
    NONE = 'LIP_N'
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
        max_length=5,
        choices=FORM,
        default=NONE
    )
    category = models.CharField(
        max_length=5,
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
    RED = "LIP_RD"
    PINK = "LIP_PK"
    ORANGE = "LIP_OR"
    PURPLE = "LIP_PU"
    COLOR = (
        (RED, "Red"),
        (PINK, "Pink"),
        (ORANGE, "Orange"),
        (PURPLE, "Purple"),
    )
    color = models.CharField(
        max_length=6,
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
