from django.test import TestCase, Client
from urllib.request import urlopen
from django.core.files import File
from django.core import files
from django.core.files.temp import NamedTemporaryFile
from ml.models import ML
from brand.models import Brand
import json
from products.base.models import Base, BaseOption


class MLTestCase(TestCase):
    def setUp(self):
        self.client=Client()
        self.brand = Brand.objects.create(name="brand1")
        self.product1 = Base.objects.create(
            name="base1", price=100, category="BAS_F", img_url="tmp_url1", brand=self.brand)
        self.color1 = BaseOption.objects.create(
            color="LT", sub_color="color", 
            color_hex="111111", optionName="option", product=self.product1
        )
        img_url = 'http://ph.spotvnews.co.kr/news/photo/201905/285546_351974_2458.jpg'
        self.img_temp = NamedTemporaryFile(delete=True, dir='media', suffix='.jpg')
        self.img_temp.write(urlopen(img_url).read())
        self.img_temp.flush()
        self.ml_object = ML.objects.create(
            user_id='1', result='result', image=files.File(self.img_temp), base='base', product = self.product1
        )
    def test_get(self):
        response = self.client.get('/api/ml/')
        res = json.loads(response.content)
        self.assertEqual(res[0]['user_id'], self.ml_object.user_id)
        self.assertEqual(res[0]['result'], self.ml_object.result)
        self.assertEqual(res[0]['base'], self.ml_object.base)
    def test_put(self):
        response = self.client.post('/api/ml/', json.dumps({}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = self.client.put('/api/ml/', json.dumps({'userID': '1'}),
                                   content_type='application/json')