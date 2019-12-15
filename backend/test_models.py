from products.lip.models import Lip, LipOption
from products.base.models import Base, BaseOption
from products.cheek.models import Cheek, CheekOption
from brand.models import Brand
import unittest
from ml.models import ML
from user.models import Profile
from django.contrib.auth.models import User

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
        self.assertEqual(str(o), str(i) + " " + o.optionName)

    def test_base_class(self):
        i = Base(name="tmp_name")
        self.assertEqual(str(i), i.name)

    def test_baseoption_class(self):
        i = Base(name="tmp_base")
        o = BaseOption(product=i, optionName="tmp_option")
        self.assertEqual(str(o), str(i) + " " + o.optionName)

        
    def test_cheek_class(self):
        i = Cheek(name="tmp_name")
        self.assertEqual(str(i), i.name)
        
    def test_cheek_option_class(self):
        i = Cheek(name="tmp_cheek")
        o = CheekOption(product=i, optionName="tmp_option")
        self.assertEqual(str(o), str(i) + " " + o.optionName)
        
    def test_ml_class(self):
        i = ML(result='0,0,0')
        i.save()
        self.assertEqual('0,0,0', i.result)


    def test_user_model(self):
        new_user = User.objects.create_user(
            username='test_name', email='test_mail', password='test_pw')
        i = Profile(user=new_user)
        self.assertEqual(str(i), new_user.username)