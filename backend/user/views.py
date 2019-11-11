"""VIEW MODEL"""
import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError


@csrf_exempt
def signup(request):
    """SIGNUP FUNCTION"""
    print("signup")
    if request.method == 'GET':
        user_all_list = [cosmos for cosmos in User.objects.all().values()]
        return JsonResponse(user_all_list, safe=False)

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
        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['GET', 'POST'])


def signin(request):  # Signin function
    """SIGNIN FUNCTION"""

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

            return HttpResponse(status=204)

        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['POST'])


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
