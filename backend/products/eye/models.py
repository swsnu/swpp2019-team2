""" model for eye cosmetic information """
from django.db import models
from brand import models as brand_models
# Create your models here.


class CommonProduct(models.Model):
    """ abstract product class"""
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    brand = models.ForeignKey(
        brand_models.Brand,
        on_delete=models.CASCADE
    )
    img_url = models.TextField(default="//:0")

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Eyeshadow(CommonProduct):
    """django eyeshadow model"""
    if_pallette = models.BooleanField()


class Eyeliner(CommonProduct):
    """django eyeliner model"""
    LIQUID = 'L'
    PENCIL = 'P'
    GEL = 'G'
    FORM = (
        (LIQUID, 'Liquid'),
        (PENCIL, 'Pencil'),
        (GEL, 'Gel')
    )
    form = models.CharField(
        max_length=1,
        choices=FORM,
        default=None
    )


class Eyebrow(CommonProduct):
    """django eyebrow model"""


class Mascara(CommonProduct):
    """django mascara model"""
    LASH = 'L'
    CURL = 'C'
    VOLUME = 'V'
    FUNCTION = (
        (LASH, "Long Lash"),
        (CURL, "Curling"),
        (VOLUME, "Volume")
    )
    func = models.CharField(
        max_length=1,
        choices=FUNCTION
    )


class EyeColorOption(models.Model):
    """ abstract product class"""
    BLACK = "BK"
    DEEPBROWN = "DB"
    LIGHTBROWN = "LB"
    ETC = "EX"
    COLOR = (
        (BLACK, "Black"),
        (DEEPBROWN, "Deep Brown"),
        (LIGHTBROWN, "Light Brown"),
        (ETC, "Etc")
    )
    color = models.CharField(
        max_length=2,
        choices=COLOR
    )
    color_hex = models.CharField(max_length=10)
    optionName = models.CharField(max_length=30)

    class Meta:
        abstract = True


class MascaraOption(EyeColorOption):
    """ mascara color option"""
    product = models.ForeignKey(Mascara, on_delete=models.CASCADE)


class EyebrowOption(EyeColorOption):
    """ eyebrow color option"""
    product = models.ForeignKey(Eyebrow, on_delete=models.CASCADE)


class EyelinerOption(EyeColorOption):
    """ eyeliner color option"""
    product = models.ForeignKey(Eyeliner, on_delete=models.CASCADE)
