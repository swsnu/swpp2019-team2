# -*- coding: utf-8 -*-
import scrapy
from crawl.items import ProductItem

class ExampleSpider(scrapy.Spider):
    name = 'basic'
    
    def start_requests(self):
        urls = [
            'http://quotes.toscrape.com/page/1/',
            'http://quotes.toscrape.com/page/2/',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        tmpItem = ProductItem(name="tmpName", price=2000)
        print("parse")
        yield tmpItem
