"""VIEW MODEL"""
import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from .models import Profile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError


@csrf_exempt
def signup(request):
    """SIGNUP FUNCTION"""

    if request.method == 'GET':
        if request.user.is_authenticated:
            user_info = list(Profile.objects.filter(user=request.user).values())
            return JsonResponse(user_info, safe=False)

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        try:
            User.objects.create_user(
                username=username, email=email, password=password)
        except IntegrityError:
            return HttpResponseBadRequest()
        user = authenticate(request, username=username, password=password)
        login(request, user)
        nickname = req_data['nickname']
        Profile.objects.create(user=request.user, nick_name=nickname)
        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['GET', 'POST'])


def signin(request):  # Signin function
    """SIGNIN FUNCTION"""

    if request.method == 'GET':
        if request.user.is_authenticated:
            user_info = list(User.objects.filter(username=request.user.username).values())
            return JsonResponse(user_info, safe=False)

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            response = user.email
            return HttpResponse(response, status=204)

        return HttpResponse(status=401)

    if request.method == 'PUT':
        user_info = Profile.objects.get(user=request.user)
        try:
            req_data = json.loads(request.body.decode())
            edit_nick_name = req_data['nickName']
            edit_prefer_color = req_data['preferColor']
            edit_prefer_base = req_data['preferBase']
            edit_prefer_brand = req_data['preferBrand']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest() 
        user_info.nick_name = edit_nick_name
        user_info.prefer_color = edit_prefer_color
        user_info.prefer_base = edit_prefer_base
        user_info.prefer_brand = edit_prefer_brand
        print(edit_prefer_brand)                                                   
        user_info.save()
        response = user_info.nick_name
        return HttpResponse(response,status=200)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])


def signout(request):
    """SIGNOUT FUNCTION"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)

        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    """TOKEN FUNCTION"""
    if request.method == 'GET':
        return HttpResponse(status=204)

    return HttpResponseNotAllowed(['GET'])
