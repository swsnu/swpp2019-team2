from django.db import models
""" model for lip cosmetic information """
# Create your models here.
from brand import models as brand_models
# Create your models here.


class Cheek(models.Model):
    """ django lip model """
    BLUSHER = 'CHK_B'
    CONTOURING = 'CHK_C'
    HIGHLIGHT = 'CHK_H'
    CATEGORY = (
        (BLUSHER, 'Blusher'),
        (CONTOURING, 'Contouring'),
        (HIGHLIGHT, 'Highlighter'),
    )
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    brand = models.ForeignKey(
        brand_models.Brand,
        on_delete=models.CASCADE
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


class CheekOption(models.Model):
    """ option of django lip model """
    RED = "CHK_RD"
    PINK = "CHK_PK"
    ORANGE = "CHK_OR"
    COLOR = (
        (RED, "Red"),
        (PINK, "Pink"),
        (ORANGE, "Orange"),
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
        Cheek,
        related_name='color',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.product) + " " + self.optionName
