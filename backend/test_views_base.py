from django.test import TestCase, Client
import json
from products.base.models import Base, BaseOption
from brand.models import Brand
from products.base.serializers import BaseSerializer, BaseOptionSerializer

class BaseTestCase(TestCase):
    
    def setUp(self):
        self.client=Client()
        self.brand = Brand.objects.create(name="brand1")
        self.product1 = Base.objects.create(
            name="base1", price=100, category="P", img_url="tmp_url1", brand=self.brand)
        self.product2 = Base.objects.create(
            name="base2", price=200, category="CU", img_url="tmp_url2", brand=self.brand)
        self.color1 = BaseOption.objects.create(
            color="LT", sub_color="WM", color_hex="hex1", optionName="option1", product=self.product1)
        self.color2 = BaseOption.objects.create(
            color="MD", color_hex="hex2", optionName="option2", product=self.product1)

    def test_bad_request(self):
        # not-allowed request 
        response = self.client.put('/api/base/tag')
        self.assertEqual(response.status_code, 405)

    def test_base_search(self):
        response = self.client.get('/api/base/category=P')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product1.name)
        self.assertEqual(res[0]["category"], 'P')


        response = self.client.get('/api/base/category=CU')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product2.name)
        self.assertEqual(res[0]["category"], 'CU')

        response = self.client.get('/api/base/color=MD')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["color"][0]["color"], self.color2.color)
        self.assertEqual(res[0]["category"], 'P')

        response = self.client.get('/api/base/color=LT&subcolor=WM')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["color"][0]["color"], self.color1.color)
        self.assertEqual(res[0]["category"], 'P')
        
        response = self.client.get('/api/base/brand=brand1')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 2)
        
        
