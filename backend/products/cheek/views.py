from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Cheek, CheekOption

def search(request, option):
    """ TODO : DOCSTRING"""
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)

    return HttpResponseNotAllowed(['GET'])
