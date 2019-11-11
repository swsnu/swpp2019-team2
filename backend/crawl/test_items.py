import unittest
import os
import django
from crawl.items import LipProduct, Brand
from scrapy_djangoitem import DjangoItem

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

class ItemTest(unittest.TestCase):

    def assert_sorted_equal(self, first, second, msg=None):
        return self.assertEqual(sorted(first), sorted(second), msg)

    def test_lip_product(self):
        i = LipProduct()
        self.assert_sorted_equal(i.fields.keys(), ['name', 'price', 'brand', 'category', 'img_url', 'crawled', 'form'])

    def test_brand_product(self):
        i = Brand()
        self.assert_sorted_equal(i.fields.keys(), ['crawled', 'name', 'url', 'name_ko'])



