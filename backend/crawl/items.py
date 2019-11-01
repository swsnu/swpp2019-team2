# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem
from lip.models import Lip
from brand.models import Brand


class LipProduct(DjangoItem):
    django_model = Lip
    color_list = scrapy.Field()
    pass

class Brand(DjangoItem):
    django_model = Brand
    pass