from django.test import TestCase, Client
import json
from products.cheek.models import Cheek, CheekOption
from brand.models import Brand
from products.cheek.serializers import CheekSerializer, CheekOptionSerializer

class BaseTestCase(TestCase):
    
    def setUp(self):
        self.client=Client()
        self.brand = Brand.objects.create(name="brand1")
        self.product1 = Cheek.objects.create(
            name="cheek1", price=100, category="CHK_B", img_url="tmp_url1", brand=self.brand)
        self.product2 = Cheek.objects.create(
            name="cheek2", price=200, category="CHK_H", img_url="tmp_url2", brand=self.brand)
        self.product3 = Cheek.objects.create(
            name="cheek3", price=300, category="CHK_B", img_url="tmp_url1", brand=self.brand)
        self.color1 = CheekOption.objects.create(
            color="CHK_RD", sub_color="hex1", color_hex="hex2", optionName="option1", product=self.product1)

    def test_bad_request(self):
        # not-allowed request 
        response = self.client.put('/api/cheek/tag')
        self.assertEqual(response.status_code, 405)

    def test_cheek_search(self):
        response = self.client.get('/api/cheek/category=CHK_H')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product2.name)
        self.assertEqual(res[0]["category"], 'CHK_H')


        response = self.client.get('/api/cheek/category=CHK_B')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product1.name)
        self.assertEqual(res[0]["category"], 'CHK_B')

        response = self.client.get('/api/cheek/color=CHK_RD&category=CHK_B')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["color"][0]["color"], self.color1.color)
        self.assertEqual(res[0]["category"], 'CHK_B')
        
        response = self.client.get('/api/cheek/color=CHK_PK&category=CHK_B')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 0)
        
        response = self.client.get('/api/cheek/all')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 3)

        response = self.client.get('/api/cheek/brand=brand1')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 3)
