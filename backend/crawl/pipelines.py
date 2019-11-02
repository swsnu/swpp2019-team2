# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from lip.models import Lip
from brand.models import Brand


class CrawlPipeline(object):
    def __init__(self):
            self.ids_seen = set()
    
    def process_item(self, item, spider):
        if item["crawled"] == "brand":
            self.process_brand(item)
        elif item["crawled"] == "product":
            item.save()
            return item
    
    def process_brand(self, item):
        if item["name"] not in self.ids_seen and len(Brand.objects.filter(name=item["name"])) == 0:
            self.ids_seen.add(item["name"])
            item.save()
            return item
        else:
            return item
