""" test views """
from django.test import TestCase, Client
import json
from products.lip.models import Lip, LipOption
from brand.models import Brand
from products.lip.serializers import LipSerializer, LipOptionSerializer

class LipTestCase(TestCase):    
    def setUp(self):
        self.client=Client()
        self.brand = Brand.objects.create(name="brand1")
        self.product1 = Lip.objects.create(
            name="lip1", price=100, form="M", category="S", img_url="tmp_url1", brand=self.brand)
        self.product2 = Lip.objects.create(
            name="lip2", price=200, form="G", category="B", img_url="tmp_url2", brand=self.brand)
        self.color1 = LipOption.objects.create(
            color="PK", sub_color="color1", color_hex="hex1", optionName="option1", product=self.product1)
        self.color3 = LipOption.objects.create(
            color="OR", sub_color="color3", color_hex="hex3", optionName="option3", product=self.product2)

    def test_bad_request(self):
        # not-allowed request 
        response = self.client.put('/api/lip/tag')
        self.assertEqual(response.status_code, 405)

    def test_lip_search(self):
        response = self.client.get('/api/lip/category=S')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product1.name)
        self.assertEqual(res[0]["category"], 'S')

        response = self.client.get('/api/lip/form=M')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product1.name)
        self.assertEqual(res[0]["form"], 'M')
        
        response = self.client.get('/api/lip/form=M&category=S')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["name"], self.product1.name)
        self.assertEqual(res[0]["category"], 'S')

        response = self.client.get('/api/lip/form=M&color=PK')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(res[0]["color"][0]["color"], self.color1.color)
        self.assertEqual(res[0]["form"], 'M')


        response = self.client.get('/api/lip/color=RD&color=PK')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 1)
        
        response = self.client.get('/api/lip/brand=brand1')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.content)
        self.assertEqual(len(res), 2)
        
