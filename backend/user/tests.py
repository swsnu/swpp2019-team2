""" TODO : DOCSTRING"""
# pylint: disable=unused-variable
# pylint: disable=unused-import
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Profile


class ModelTestCase(TestCase):
    """ TODO : DOCSTRING"""

    def test_csrf(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/',
                               {'username': 'chris',
                                'password': 'chris'},
                               content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/',
                               {'username': 'chris',
                                'password': 'chris'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_csrf_notget(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post(
            '/api/token/',
            content_type='application/json',
            HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

    def test_signup(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/api/signup/',
                                 {'username': 'chris',
                                  'password': 'chris'},
                                 content_type='application/json',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

    def test_signup_get(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user_info = User.objects.create_user(
            username='a', email='a@a.com', password='123')
        client.login(username='a', password='123')
        profile = Profile.objects.create(
            user=user_info,
            nick_name='test',
            prefer_color='12345',
            prefer_base='123',
            prefer_brand='123')
        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 200)  # Pass csrf protection

    def test_signin_put(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user_info = User.objects.create_user(
            username='a', email='a@a.com', password='123')
        profile = Profile.objects.create(
            user=user_info,
            nick_name='test',
            prefer_color='12345',
            prefer_base='123',
            prefer_brand='123')
        client.login(username='a', password='123')
        response = client.put('/api/signin/',
                              {'nickName': 'a',
                               'preferColor': '1',
                               'preferBase': '2',
                               'preferBrand': '3'},
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)  # Pass csrf protection

    def test_signin_put_wrongdata(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user_info = User.objects.create_user(
            username='a', email='a@a.com', password='123')
        profile = Profile.objects.create(
            user=user_info,
            nick_name='test',
            prefer_color='12345',
            prefer_base='123',
            prefer_brand='123')
        client.login(username='a', password='123')
        response = client.put('/api/signin/',
                              {'nickName': 'a',
                               'preferBase': '2',
                               'preferBrand': '3'},
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_signin_get(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user_info = User.objects.create_user(
            username='a', email='a@a.com', password='123')
        client.login(username='a', password='123')
        response = client.get('/api/signin/')
        self.assertEqual(response.status_code, 200)  # Pass csrf protection

    def test_signup_(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/',
                               {'username': 'chris',
                                'email': '1',
                                'password': '2',
                                'nickname': '3'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_signup_wrongrequest(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/api/signup/',
                                 {'username': 'chris',
                                  'email': '1',
                                  'password': '2',
                                  'nickname': '3'},
                                 content_type='application/json',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

    def test_signup_wrongdata(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/',
                               {'nickname': '1',
                                'password': '2'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_signup_wronguser(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user_info = User.objects.create_user(
            username='1', email='1', password='2')
        response = client.post('/api/signup/',
                               {'username': '1',
                                'email': '1',
                                'password': '2',
                                'nickname': '2'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_signin1(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/',
                               {'username': 'test',
                                'password': '12345'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)  # Pass csrf protection

    def test_signin_wrongdata(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/',
                               {'password': '12345'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_login(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        user = User.objects.create_user(username='test', password='12345')
        response = client.post('/api/signin/',
                               {'username': 'test',
                                'password': '12345'},
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

    def test_logout(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        user = User.objects.create_user(username='test', password='12345')
        client.login(username='test', password='12345')  # 가상 로그인
        response = client.get('/api/signout/',
                              {'username': 'test',
                               'password': '12345'},
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

    def test_signin2(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/api/signin/',
                                 {'username': 'chris',
                                  'password': 'chris'},
                                 content_type='application/json',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

    def test_signout1(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/signout/',
                              {'username': 'chris',
                               'password': 'chris'},
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)  # Pass csrf protection

    def test_signout2(self):  # FIXME : 요거 해결하야함
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)
        response1 = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response1.cookies['csrftoken'].value

        response2 = client.get(
            '/api/signout/',
            content_type='application/json',
            HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response2.status_code, 401)  # Pass csrf protection

    def test_signout3(self):
        """ TODO : DOCSTRING"""
        client = Client(enㅌforce_csrf_checks=True)
        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        response = client.post(
            '/api/signout/',
            content_type='application/json',
            HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection
