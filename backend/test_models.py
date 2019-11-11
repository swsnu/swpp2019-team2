from products.lip.models import Lip, LipOption
from brand.models import Brand
import unittest

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
    