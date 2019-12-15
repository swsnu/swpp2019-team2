# -*- coding: utf-8 -*-
""" scrapy spider for aritaum webpage """
import random
import scrapy
from crawl.items import LipProduct, LipColor
from brand.models import Brand as Brand_db
from products.lip.models import Lip as Lip_db
from .color_tag import cal_color_tag


class MacLipSpider(scrapy.Spider):
    """ scrapy spider for mac lip product """
    name = "mac-lip"

    def __init__(self):
        scrapy.Spider.__init__(self)
        self.brand = Brand_db.objects.filter(name="MAC")[0]

    def start_requests(self):
        urls = [{'category': 'LIP_S',
                 'link': 'https://www.maccosmetics.co.kr/products/13854/Products/Makeup/Lips/Lipstick'},
                {'category': 'LIP_G',
                 'link': 'https://www.maccosmetics.co.kr/products/13853/Products/Makeup/Lips/Lip-Gloss'},
                {'category': 'LIP_S',
                 'link': 'https://www.maccosmetics.co.kr/products/13852/Products/Makeup/Lips/Lip-Pencil'}]

        for url in urls:
            yield scrapy.Request(
                url=url["link"],
                meta={"category": url["category"]},
                callback=self.parse
            )

    @staticmethod
    def parse_price(price):
        """ return int -price """
        return int(price[2:].replace(',', ''))

    def parse(self, response):
        product_name = response.css('h3.product__subline::text').getall()
        price = response.css(
            'header > div > div > span.product__price--standard::text').getall()
        product_url = response.css(
            'div.product__image-medium > a.product__image-medium-link::attr(href)').getall()
        thumb_url = response.css(
            'div.product__image-medium > a.product__image-medium-link > img.product__sku-image--rendered--medium::attr(src)').getall()
        host = 'https://www.maccosmetics.co.kr'
        category = response.meta['category']

        for i, name in enumerate(product_name):
            url = host + product_url[i]
            int_price = self.parse_price(price[i])
            index = random.randint(0, 2)
            forms = ['LIP_M', 'LIP_G', 'LIP_N']
            yield LipProduct(
                name=product_name[i],
                price=int_price,
                brand=self.brand,
                category=category,
                img_url=host + thumb_url[i],
                crawled="lip",
                product_url=host + product_url[i],
                form=forms[index]
            )

            yield scrapy.Request(
                url=url,
                meta={'product': name},
                callback=self.parse_color
            )

    @staticmethod
    def parse_hex(hexa):
        ''' return parsed hex value '''
        return hexa[11:18]

    def parse_color(self, response):
        ''' yield scrapy color object '''
        rgb = response.css(
            'div.product-full__shade > div.product-full__shade-swatch::attr(style)').getall()
        name = response.css(
            'div.product-full__shade > div.product-full__shade-name::text').getall()

        product_name = response.meta['product']
        print(product_name)
        product = Lip_db.objects.filter(name=product_name)[0]

        for i, hexa in enumerate(rgb):
            color_hex = self.parse_hex(hexa)
            color_name = name[i]
            color_tuple = cal_color_tag("lip", color_hex)
            yield LipColor(
                color_hex=color_hex,
                color=color_tuple[0],
                sub_color=color_tuple[1],
                optionName=color_name,
                product=product,
                crawled="lip_option"
            )
