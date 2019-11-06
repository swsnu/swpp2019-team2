# -*- coding: utf-8 -*-
""" scrapy spider for aritaum webpage """
import scrapy
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from crawl.items import LipProduct, Brand
from brand.models import Brand as Brand_db


class AritaumSpider(scrapy.Spider):
    """ Real Spider extends scrapy.Spider """
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
             link:"https://www.aritaum.com/shop/pr/shop_pr_product_list.do?i_sCategorycd1=CTGA2000&i_sCategorycd2=CTGA2200"
             },
        ]
        for url in urls:
            self.browser.get(url[link])
            yield scrapy.Request(url=url[link], meta={idx: url[idx]}, callback=self.parse)

    def parse(self, response):
        driver = self.browser
        brand_list = driver.find_elements_by_name("tagging_brandNm")
        product_list = driver.find_elements_by_xpath(
            "//*[@id='ul_prod_list']/li")
        brand_name = driver.find_elements_by_css_selector("span.goods-brand")
        yield scrapy.Request(
            url=response.url,
            meta={"brand": brand_list,
                  "brand_name": brand_name,
                  "product": product_list,
                  "category": response.meta["category"],
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
                "category": response.meta["category"]
            },
            callback=self.parse_product,
            dont_filter=True)

    def parse_product(self, response):
        """ parse product information from page """
        category_en = {
            "립스틱": "S",
            "립글로즈": "G",
            "립케어/립밤": "B",
            "립틴트": "T",
            "립글로스": "S"
        }
        for item in response.meta["product"]:
            product_name = item.find_element_by_name(
                "tagging_productNm").get_property("value")
            brand_name = item.find_element_by_name(
                "tagging_brandNm").get_property("value")
            price = item.find_element_by_name(
                "tagging_price").get_property("value")
            category_ko = item.find_element_by_name(
                "tagging_category").get_property("value")[12:]
            try:
                category = category_en[category_ko]
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
            # TODO : Color 정보 저장해야
            # color_range = item.find_elements_by_xpath(
            #     "//*[@id='ul_prod_list']/li[1]/div/div[1]/div/div[1]/div/ul/li")
            # for color in color_range:
            #     color_img_src = color.find_element_by_tag_name(
            #         "img").get_property("src")
            #     color_name = color.find_element_by_tag_name(
            #         "label").get_attribute("data-tooltip")
        yield scrapy.Request(
            url=response.url,
            meta={"category": response.meta["category"]},
            callback=self.go_next,
            dont_filter=True
        )

    def go_next(self, response):
        """ click next button on page """
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
        """ close selenium browser after spider closed """
        self.browser.close()
