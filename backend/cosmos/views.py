from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.contrib.auth import login, authenticate ,logout
from .models import ColorRange,Lip,Brand
from json import JSONDecodeError
from django.views.decorators.csrf import csrf_exempt

from django.core import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.db import IntegrityError






def lip(request):
    if request.method == 'GET':
        if request.user.is_authenticated:  #로그인 확인                                                          
            lip_all_list = [cosmos for cosmos in Lip.objects.all().values()]
            return JsonResponse(lip_all_list, safe=False)
        else:
            return HttpResponse(status = 401)





def signup(request):
    if request.method == 'GET':
        #if request.user.is_authenticated:  #로그인 확인                                                          
        user_all_list = [cosmos for cosmos in User.objects.all().values()]
        return JsonResponse(user_all_list, safe=False)

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:                                                
                return HttpResponseBadRequest()
        try:
            User.objects.create_user(username=username, email=email, password=password)
        
        except IntegrityError as e: 
            return HttpResponseBadRequest()
        
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET','POST']) 

def signin(request):

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:                                                
                return HttpResponseBadRequest()

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)


            return HttpResponse(status=204)
        
        else: 
            return HttpResponse(status=401)
    
    else:
        return HttpResponseNotAllowed(['POST']) 


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET']) 


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
# Create your views here.