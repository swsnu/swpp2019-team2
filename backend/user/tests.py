""" TODO : DOCSTRING"""
# pylint: disable=unused-variable
# pylint: disable=unused-import
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User


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

    def test_signup_wrongdata(self):
        """ TODO : DOCSTRING"""
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/',
                               {'password': 'chris',
                                'author': 1},
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
