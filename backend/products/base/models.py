from django.db import models
from brand import models as brand_models
# Create your models here.


class Base(models.Model):
    """ django Base model """
    POWDER = 'P'
    CUSHION = 'CU'
    FOUNDATION = 'F'
    PRIMER = 'PR'
    BB = 'B'
    CONCEALER = 'C'
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
        max_length=1,
        choices=CATEGORY,
    )
    img_url = models.TextField(default="//:0")

    def __str__(self):
        return self.name


class BaseOption(models.Model):
    """ option of django base model """
    LIGHT = "LT"
    MIDDLE = "MD"
    DARK = "DK"
    NONE = "NO"
    COLOR = (
        (LIGHT, "under 21"),
        (MIDDLE, "21 ~ 23"),
        (DARK, "over 23"),
        (NONE, "Other type")
    )
    color = models.CharField(
        max_length=2,
        choices=COLOR
    )
    sub_color = models.CharField(
        default=None,
        null=True,
        max_length=30
        )
    color_hex = models.CharField(max_length=10)
    optionName = models.CharField(max_length=30)
    product = models.ForeignKey(
        Base,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.product) + " " + self.optionName
