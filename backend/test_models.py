from lip.models import Lip
from brand.models import Brand
import unittest

class ItemTest(unittest.TestCase):
    
    def test_lip_class(self):
        i = Lip(name="tmp_name")
        self.assertEqual(str(i), i.name)

    def test_brand_class(self):
        i = Brand(name="tmp_name")
        self.assertEqual(str(i), i.name)

    