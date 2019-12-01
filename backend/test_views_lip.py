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

<<<<<<< HEAD:backend/test_views.py
class MLTestCase(TestCase):
    def setUp(self):
        self.client=Client()
        self.brand = Brand.objects.create(name="brand1")
        self.product1 = Base.objects.create(
            name="base1", price=100, category="F", img_url="tmp_url1", brand=self.brand)
        self.color1 = BaseOption.objects.create(
            color="LT", sub_color="color", 
            color_hex="111111", optionName="option", product=self.product1
        )
        img_url = 'http://ph.spotvnews.co.kr/news/photo/201905/285546_351974_2458.jpg'
        # self.img_temp = NamedTemporaryFile(dir='media', suffix='.jpg')
        # self.img_temp.write(urlopen(img_url).read())
        # self.img_temp.flush()
        self.ml_object = ML.objects.create(
            user_id='1', result='result', image='files.File(self.img_temp)', base='base', product = self.product1
        )
    def test_get(self):
        response = self.client.get('/api/ml/')
        res = json.loads(response.content)
        self.assertEqual(res[0]['user_id'], self.ml_object.user_id)
        self.assertEqual(res[0]['result'], self.ml_object.result)
        self.assertEqual(res[0]['base'], self.ml_object.base)
    # def test_put(self):
    #     response = self.client.post('/api/ml/', json.dumps({}),
    #                                 content_type='application/json')
    #     self.assertEqual(response.status_code, 400)
    #     response = self.client.put('/api/ml/', json.dumps({'userID': '1'}),
    #                                content_type='application/json')
        
=======

        
>>>>>>> origin:backend/test_views_lip.py
