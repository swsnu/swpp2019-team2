"""Define Scrapy Items"""
# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem
from products.lip.models import Lip, LipOption
from brand.models import Brand as BrandModel
from products.base.models import Base, BaseOption
#pylint: disable=ungrouped-imports


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
