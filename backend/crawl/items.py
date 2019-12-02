"""Define Scrapy Items"""
# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem
from brand.models import Brand as BrandModel
from products.lip.models import Lip, LipOption
from products.cheek.models import Cheek, CheekOption
from products.base.models import Base, BaseOption
#pylint: disable=ungrouped-imports

class CheekProduct(DjangoItem):
    """ Cheek Scrapy Item"""
    django_model = Cheek
    crawled = scrapy.Field()

class CheekColor(DjangoItem):
    django_model = CheekOption
    crawled = scrapy.Field()
    

class BaseProduct(DjangoItem):
    """BaseProduct Scrapy Item"""
    django_model = Base
    crawled = scrapy.Field()


class BaseColor(DjangoItem):
    """BaseColor Scrapy Item"""
    django_model = BaseOption
    crawled = scrapy.Field()


class LipColor(DjangoItem):
    """LipColor Scrapy Item"""
    django_model = LipOption
    crawled = scrapy.Field()


class LipProduct(DjangoItem):
    """LipProduct Scrapy Item"""
    django_model = Lip
    crawled = scrapy.Field()

class Brand(DjangoItem):
    """Brand Scrapy Item"""
    django_model = BrandModel
    crawled = scrapy.Field()

