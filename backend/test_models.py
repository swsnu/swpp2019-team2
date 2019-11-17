from products.lip.models import Lip, LipOption
from products.base.models import Base, BaseOption
from brand.models import Brand
import unittest
from products.eye.models import CommonProduct

class ItemTest(unittest.TestCase):
    
    def test_lip_class(self):
        i = Lip(name="tmp_name")
        self.assertEqual(str(i), i.name)

    def test_brand_class(self):
        i = Brand(name_ko="tmp_name")
        self.assertEqual(str(i), i.name_ko)

    def test_lipoption_class(self):
        i = Lip(name="tmp_lip")
        o = LipOption(product=i, optionName="tmp_option")
        self.assertEqual(str(o), str(i)+" "+ o.optionName)
    
    def test_base_class(self):
        i = Base(name="tmp_name")
        self.assertEqual(str(i), i.name)
    
    def test_baseoption_class(self):
        i = Base(name="tmp_base")
        o = BaseOption(product=i, optionName="tmp_option")
        self.assertEqual(str(o), str(i)+" "+ o.optionName)

    def test_eye_class(self):
        i = CommonProduct(name="tmp_name")
        self.assertEqual(str(i), i.name)