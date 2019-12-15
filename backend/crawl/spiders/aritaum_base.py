# -*- coding: utf-8 -*-
""" scrapy spider for aritaum webpage """
import scrapy
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import requests
import webcolors
from PIL import Image
from crawl.items import Brand, BaseProduct, BaseColor
from brand.models import Brand as Brand_db
from products.base.models import Base as Base_db
from .spider_helper import translate_category
from .color_tag import cal_color_tag
import random


class AritaumSpider(scrapy.Spider):
    """ Real Spider extends scrapy.Spider """
    name = 'aritaum-base'

    def __init__(self):
        print("init")
        scrapy.Spider.__init__(self)
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        self.browser = webdriver.Chrome('chromedriver', chrome_options=options)

    def start_requests(self):
        link = 'link'
        title = 'title'

        urls = [{
            title: "base",
            link: "https://www.aritaum.com/shop/pr/shop_pr_product_list.do?i_sCategorycd1=CTGA2000&i_sCategorycd2=CTGA2100"
        }]
        for url in urls:
            self.browser.get(url[link])
            yield scrapy.Request(url=url[link], meta={"title": url["title"]}, callback=self.parse)

    def parse(self, response):
        driver = self.browser
        brand_list = driver.find_elements_by_name("tagging_brandNm")
        product_list = driver.find_elements_by_xpath(
            "//*[@id='ul_prod_list']/li")
        brand_name = driver.find_elements_by_css_selector("span.goods-brand")
        yield scrapy.Request(
            url=response.url,
            meta={
                "brand": brand_list,
                "brand_name": brand_name,
                "product": product_list,
                "title": response.meta["title"],
            },
            callback=self.parse_brand,
            dont_filter=True)

    def parse_brand(self, response):
        """ parse brand name from page """
        brand_list = response.meta["brand"]
        brand_name_ko = response.meta["brand_name"]

        # pylint: disable=unused-variable
        for i, item in enumerate(brand_list):
            name_ko = brand_name_ko[i].text
            name_en = brand_list[i].get_property("value")
            yield Brand(name=name_en, name_ko=name_ko, crawled="brand")

        yield scrapy.Request(
            url=response.url,
            meta={
                "product": response.meta["product"],
                "title": response.meta["title"]
            },
            callback=self.parse_product,
            dont_filter=True)

    @staticmethod
    def check_color(name):
        """ check color name and return value"""
        if any(x in name for x in ['11', '13', '19']):
            return "BAS_LT"
        if '21' in name:
            return "BAS_MD"
        if '23' in name:
            return "BAS_DK"
        index = random.randint(0, 2)
        color = ['BAS_LT', 'BAS_MD', 'BAS_DK']
        return color[index]

    def parse_product(self, response):
        """ parse product information from page """
        #pylint: disable=too-many-locals
        title = response.meta["title"]

        for item in response.meta["product"]:
            product_name = item.find_element_by_name(
                "tagging_productNm").get_property("value")
            print(product_name)
            brand_name = item.find_element_by_name(
                "tagging_brandNm").get_property("value")
            price = item.find_element_by_name(
                "tagging_price").get_property("value")
            product_id = item.find_element_by_name(
                "i_sProductcd").get_property("value")
            product_url = "https://www.aritaum.com/shop/pr/shop_pr_product_view.do?i_sProductcd=" + product_id
            category_raw = item.find_element_by_name(
                "tagging_category").get_property("value")
            category = translate_category(category_raw, title)
            if category == -1:
                pass
            brand = Brand_db.objects.filter(name=brand_name)
            thumb_url = item.find_element_by_css_selector(
                "div.product-thumb img").get_property("src")
            yield BaseProduct(
                name=product_name,
                price=price,
                brand=brand[0],
                category=category,
                img_url=thumb_url,
                crawled=title,
                product_url=product_url
            )

            color_range = item.find_elements_by_class_name(
                "product-unit__scroller-item")
            for color in color_range:
                color_name = color.find_element_by_tag_name(
                    "label").get_attribute("data-tooltip")
                if color_name is None:
                    continue
                try:
                    color_url = color.find_element_by_tag_name(
                        "img").get_property("src")
                    yield scrapy.Request(
                        url=color_url,
                        meta={
                            "product": product_name,
                            "color": color_name
                        },
                        callback=self.save_color_by_url,
                        dont_filter=True
                    )
                except NoSuchElementException:
                    color_rgb = color.find_element_by_xpath(
                        "./span/label/span").value_of_css_property("background-color")
                    color_hex = self.save_color_by_rgb(color_rgb)
                    product = Base_db.objects.filter(name=product_name)[0]
                    color = self.check_color(color_name)
                    sub_color = cal_color_tag("base", color_hex)
                    yield BaseColor(
                        color_hex=color_hex,
                        optionName=color_name,
                        product=product,
                        crawled="base_option",
                        color=color,
                        sub_color=sub_color
                    )

        yield scrapy.Request(
            url=response.url,
            meta={"title": title},
            callback=self.go_next,
            dont_filter=True
        )

    def save_color_by_url(self, response):
        """yield Request for color url"""
        url = response.url
        name = response.meta["product"]
        img = Image.open(requests.get(url, stream=True).raw)
        img = img.resize((30, 30))
        color_hex = self.getcolors(img, url)
        product = Base_db.objects.filter(name=name)[0]
        color = self.check_color(response.meta["color"])
        sub_color = cal_color_tag("base", color_hex)
        yield BaseColor(
            color_hex=color_hex,
            optionName=response.meta["color"],
            product=product,
            crawled="base_option",
            color=color,
            sub_color=sub_color
        )

    @staticmethod
    def save_color_by_rgb(rgba):
        """yield scrapy request for color rgb"""
        r_1 = rgba.split("(")[1]
        r_2 = r_1.split(")")[0]
        colors = r_2.split(", ")
        rgb = (int(colors[0]), int(colors[1]), int(colors[2]))
        color_hex = webcolors.rgb_to_hex(rgb)
        return color_hex

    @staticmethod
    def getcolors(img, url):
        """get color hexa value from url image"""
        #pylint: disable=too-many-locals
        width, height = img.size
        colors = img.getcolors(width * height)

        r_total = 0
        g_total = 0
        b_total = 0
        count = 0
        for pixel in colors:
            red, green, blue = pixel[1]
            if (red + green + blue) / 3 >= 250:
                count += pixel[0]
                continue
            r_total += pixel[0] * red
            g_total += pixel[0] * green
            b_total += pixel[0] * blue
        try:
            r_sum = int(r_total / (width * height - count))
            g_sum = int(g_total / (width * height - count))
            b_sum = int(b_total / (width * height - count))
            return webcolors.rgb_to_hex((r_sum, g_sum, b_sum))
        except ZeroDivisionError:
            print(url)

    def go_next(self, response):
        """ click next button on page """
        driver = self.browser
        try:
            click_next = driver.find_element_by_css_selector(
                "a.page-nav__link.is-current + a.page-nav__link")
            click_next.click()
            driver.implicitly_wait(10)
            yield scrapy.Request(
                url=response.url,
                meta={"title": response.meta["title"]},
                callback=self.parse,
                dont_filter=True
            )
        except NoSuchElementException:  # spelling error making this code not work as expected
            try:
                click_next_page = driver.find_element_by_css_selector(
                    "a.page-nav__link.page-nav__link--next")
                click_next_page.click()
                driver.implicitly_wait(5)
                yield scrapy.Request(
                    url=response.url,
                    meta={"title": response.meta["title"]},
                    callback=self.parse,
                    dont_filter=True
                )
            except NoSuchElementException:
                pass

    def spider_closed(self):
        """ close selenium browser after spider closed """
        self.browser.close()
