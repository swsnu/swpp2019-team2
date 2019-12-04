""" Django Base Product Model """
from django.db import models
from brand import models as brand_models
# Create your models here.


class Base(models.Model):
    """ django Base model """
    POWDER = 'BAS_P'
    CUSHION = 'BAS_CU'
    FOUNDATION = 'BAS_F'
    PRIMER = 'BAS_PR'
    BB = 'BAS_B'
    CONCEALER = 'BAS_C'
    CATEGORY = (
        (POWDER, 'Powder'),
        (CUSHION, 'Cushion'),
        (CONCEALER, 'Concealer'),
        (FOUNDATION, 'Foundation'),
        (PRIMER, 'Primer'),
        (BB, 'BB & CC')
    )

    name = models.CharField(max_length=20)
    price = models.IntegerField()
    brand = models.ForeignKey(
        brand_models.Brand,
        on_delete=models.CASCADE
    )
    category = models.CharField(
        max_length=6,
        choices=CATEGORY,
    )
    product_url = models.CharField(
        max_length=255,
        default="//:0",
    )
    img_url = models.TextField(default="//:0")

    def __str__(self):
        return self.name


class BaseOption(models.Model):
    """ option of django base model """
    LIGHT = "BAS_LT"
    MIDDLE = "BAS_MD"
    DARK = "BAS_DK"
    COLOR = (
        (LIGHT, "under 21"),
        (MIDDLE, "21"),
        (DARK, "23 and over"),
        (None, None)
    )
    color = models.CharField(
        default=None,
        max_length=6,
        choices=COLOR,
        null=True
    )
    WARM = "BAS_WM"
    NEUTRAL = "BAS_NT"
    COOL = "BAS_CL"
    SUBCOLOR = (
        (WARM, "Warm Tone"),
        (NEUTRAL, "Neutral Tone"),
        (COOL, "Cool Tone"),
        (None, None)
    )
    sub_color = models.CharField(
        default=None,
        max_length=6,
        choices=SUBCOLOR,
        null=True
    )
    color_hex = models.CharField(max_length=10)
    optionName = models.CharField(max_length=30)
    product = models.ForeignKey(
        Base,
        related_name='color',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.product) + " " + self.optionName
