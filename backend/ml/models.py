""" ML model """
from django.db import models
# from products.base import models as product_models
# Create your models here.
from products.base import models as base_model


class ML(models.Model):
    """ model for ML results """
    user_id = models.CharField(max_length=30, default="NONE")
    result = models.CharField(max_length=30, default="NONE")
    image = models.ImageField(upload_to='images')
    base = models.CharField(max_length=100, default="NONE")
    output_image = models.ImageField(null=True)
    product = models.ForeignKey(
        base_model.Base,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
