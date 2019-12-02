""" spider pipelines """
# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from products.lip.models import Lip, LipOption
from products.base.models import Base, BaseOption
from products.cheek.models import Cheek, CheekOption
from brand.models import Brand


class CrawlPipeline(object):
    """ basic pipeline class """

    def __init__(self):
        self.ids_seen = set()

    def process_item(self, item, spider):
        """ processing item depends on its type """
        if item["crawled"] == "brand":
            self.process_brand(item, spider)
        elif item["crawled"] == "lip":
            if len(Lip.objects.filter(name=item["name"])) == 0:
                item.save()
                return item
        elif item["crawled"] == "lip_option":
            if len(LipOption.objects.filter(
                    optionName=item["optionName"]
                ).filter(
                    product=item["product"])) == 0:
                item.save()
                return item
        elif item["crawled"] == "base":
            if len(Base.objects.filter(name=item["name"])) == 0:
                item.save()
                return item
        elif item["crawled"] == "base_option":
            if len(BaseOption.objects.filter(
                    optionName=item["optionName"]
                ).filter(
                    product=item["product"])) == 0:
                item.save()
                return item
        elif item["crawled"] == "cheek":
            if len(Cheek.objects.filter(name=item["name"])) == 0:
                item.save()
                return item
        elif item["crawled"] == "cheek_option":
            if len(CheekOption.objects.filter(
                    optionName=item["optionName"]
                ).filter(
                    product=item["product"])) == 0:
                item.save()
                return item
        return item

    def process_brand(self, item, spider):
         # pylint: disable=unused-argument
        """ check if that brand is already seen """
        if item["name"] not in self.ids_seen and len(
                Brand.objects.filter(name=item["name"])) == 0:
            self.ids_seen.add(item["name"])
            item.save()
        return item
