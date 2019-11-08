from django.test import TestCase, Client
import json
from .models import Brand,ColorRange,Lip
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.urls import reverse, resolve



class ModelTestCase(TestCase):

    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', {'username': 'chris', 'password': 'chris'},
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup/', {'username': 'chris', 'password': 'chris'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_csrf_notget(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/token/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)  # Pass csrf protection





    def test_signup(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.delete('/api/signup/', {'username': 'chris', 'password': 'chris'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code,405)  # Pass csrf protection

    
    def test_signup_wrongdata(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup/', {'password': 'chris','author': 1},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code,400)  # Pass csrf protection
        
    def test_signin1(self):

        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signin/', {'username': 'test', 'password': '12345'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)  # Pass csrf protection

    def test_signin_wrongdata(self):
    
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signin/', {'password': '12345'}, content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    
    def test_login(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        user = User.objects.create_user(username='test',password='12345')
        response = client.post('/api/signin/',{'username':'test', 'password':'12345'},content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)



    def test_logout(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        user = User.objects.create_user(username='test',password='12345')
        client.login(username='test',password='12345')  # 가상 로그인
        response = client.get('/api/signout/',{'username':'test', 'password':'12345'},content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204) 


          
 
    def test_signin2(self): 
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.delete('/api/signin/', {'username': 'chris', 'password': 'chris'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code,405)  # Pass csrf protection

    def test_signout1(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.get('/api/signout/', {'username': 'chris', 'password': 'chris'},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code,401)  # Pass csrf protection

    
    def test_signout2(self):  #요거 해결하야함
        class MockUser:
            username = 'test'
            password = '12345'
            is_authenticated = True
        client = Client(enforce_csrf_checks=True)
        response1 = client.get('/api/token/')
        csrftoken = response1.cookies['csrftoken'].value  # Get csrf token from cookie

        response2 = client.get('/api/signout/',content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response2.status_code,401)  # Pass csrf protection

    def test_signout3(self):
        class MockUser:
            is_authenticated = True
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/signout/',content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code,405)  # Pass csrf protection



