# -*- coding: utf-8 -*-
""" scrapy spider for aritaum webpage """
import scrapy
from crawl.items import BaseProduct, BaseColor
from brand.models import Brand as Brand_db
from products.base.models import Base as Base_db


class MacLipSpider(scrapy.Spider):
    """ scrapy spider for mac lip product """
    name = "mac-base"

    def __init__(self):
        scrapy.Spider.__init__(self)
        self.brand = Brand_db.objects.filter(name="MAC")[0]

    def start_requests(self):
        urls = [{'category': 'BAS_P',
                 'link': 'https://www.maccosmetics.co.kr/products/13849/Products/Makeup/Face/Powder'},
                {'category': 'BAS_F',
                 'link': 'https://www.maccosmetics.co.kr/products/13847/Products/Makeup/Face/Foundation'},
                {'category': 'BAS_PR',
                 'link': 'https://www.maccosmetics.co.kr/products/14764/Products/Makeup/Face/Face-Primer'},
                {'category': 'BAS_C',
                 'link': 'https://www.maccosmetics.co.kr/products/13844/Products/Makeup/Face/Concealer'}]

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
            yield BaseProduct(
                name=product_name[i],
                price=int_price,
                brand=self.brand,
                category=category,
                img_url=host + thumb_url[i],
                crawled="base",
                product_url=host + product_url[i]
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

    @staticmethod
    def parse_subcolor(option):
        ''' return parsed option value '''
        if option <= 19:
            return 'BAS_LT'
        if option <= 22:
            return 'BAS_MD'
        return 'BAS_DK'

    def parse_option(self, option):
        ''' return parsed option value '''
        if option.startswith('NC'):
            sub_color = self.parse_subcolor(int(option[2:4]))
            return ('BAS_CL', sub_color)
        if option.startswith('NW'):
            sub_color = self.parse_subcolor(int(option[2:4]))
            return ('BAS_WM', sub_color)
        if option.startswith('N'):
            sub_color = self.parse_subcolor(int(option[1:3]))
            return ('BAS_NT', sub_color)
        return (None, None)

    def parse_color(self, response):
        ''' yield scrapy color object '''
        rgb = response.css(
            'div.product-full__shade > div.product-full__shade-swatch::attr(style)').getall()
        name = response.css(
            'div.product-full__shade > div.product-full__shade-name::text').getall()

        product_name = response.meta['product']
        product = Base_db.objects.filter(name=product_name)[0]

        for i, hexa in enumerate(rgb):
            color_hex = self.parse_hex(hexa)
            color_name = name[i]
            color = self.parse_option(color_name)
            yield BaseColor(
                color_hex=color_hex,
                optionName=color_name,
                color=color[1],  # text under 19, 21, over23
                sub_color=color[0],
                product=product,
                crawled="base_option"
            )
