# -*- coding: utf-8 -*-
import scrapy
from crawl.items import LipProduct, Brand
from selenium import webdriver
from brand.models import Brand as Brand_db
from selenium.common.exceptions import NoSuchElementException


class AritaumShopSpider(scrapy.Spider):
    name = 'aritaum'

    def __init__(self):
        scrapy.Spider.__init__(self)
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        self.browser = webdriver.Chrome('chromedriver', chrome_options=options)

    def start_requests(self):
        link = 'link'
        idx = 'category'

        urls = [
            {idx: "lip",
             link: "https://www.aritaum.com/shop/pr/shop_pr_product_list.do?i_sCategorycd1=CTGA2000&i_sCategorycd2=CTGA2200"},
        ]
        for url in urls:
            self.browser.get(url[link])
            yield scrapy.Request(url=url[link], meta={idx: url[idx]}, callback=self.parse)

    def parse(self, response):
        driver = self.browser
        brand_list = driver.find_elements_by_name("tagging_brandNm")
        product_list = driver.find_elements_by_xpath(
            "//*[@id='ul_prod_list']/li")
        yield scrapy.Request(
            url=response.url,
            meta={"brand": brand_list,
                  "product": product_list,
                  "category": response.meta["category"],
                  },
            callback=self.parse_brand,
            dont_filter=True)

    def parse_brand(self, response):
        brand_list = response.meta["brand"]
        product_list = response.meta["product"]

        for brand_name in brand_list:
            yield Brand(name=brand_name.get_property("value"), crawled="brand")

        yield scrapy.Request(
            url=response.url,
            meta={
                "product": product_list,
                "category": response.meta["category"]
            },
            callback=self.parse_product,
            dont_filter=True)

    def parse_product(self, response):
        product_list = response.meta["product"]
        category_EN = {
            "립스틱": "S",
            "립글로즈": "G",
            "립케어/립밤": "B",
            "립틴트": "T",
            "립글로스": "S"
        }
        for item in product_list:
            product_name = item.find_element_by_name(
                "tagging_productNm").get_property("value")
            brand_name = item.find_element_by_name(
                "tagging_brandNm").get_property("value")
            price = item.find_element_by_name(
                "tagging_price").get_property("value")
            category_KO = item.find_element_by_name(
                "tagging_category").get_property("value")[12:]
            try:
                category = category_EN[category_KO]
            except KeyError:
                continue
            brand = Brand_db.objects.filter(name=brand_name)
            thumb_url = item.find_element_by_css_selector(
                "div.product-thumb img").get_property("src")

            yield LipProduct(
                name=product_name,
                price=price,
                brand=brand[0],
                category=category,
                img_url=thumb_url,
                crawled="product"
            )
            # FIXME : Color 정보 저장해야
            color_range = item.find_elements_by_xpath(
                "//*[@id='ul_prod_list']/li[1]/div/div[1]/div/div[1]/div/ul/li")
            for color in color_range:
                color_img_src = color.find_element_by_tag_name(
                    "img").get_property("src")
                color_name = color.find_element_by_tag_name(
                    "label").get_attribute("data-tooltip")
        yield scrapy.Request(
            url=response.url,
            meta={"category": response.meta["category"]},
            callback=self.go_next,
            dont_filter=True
        )

    def go_next(self, response):
        driver = self.browser
        try:
            click_next = driver.find_element_by_css_selector(
                "a.page-nav__link.is-current + a.page-nav__link")
            click_next.click()
            driver.implicitly_wait(5)
            yield scrapy.Request(
                url=response.url,
                meta={"category": response.meta["category"]},
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
                    meta={"category": response.meta["category"]},
                    callback=self.parse,
                    dont_filter=True
                )
            except NoSuchElementException:
                pass

    def spider_closed(self):
        self.driver.close()
