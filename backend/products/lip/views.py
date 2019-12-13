""" TODO : DOCSTRING"""
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponse
from .models import Lip, LipOption
from .serializers import LipSerializer
import random


def search(request, option):
    """ TODO : DOCSTRING"""
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)
        if 'category' not in query and 'form' not in query:
            lip = Lip.objects.all()
        else:
            if 'category' in query and 'form' in query:
                lip = Lip.objects.filter(
                    category__in=query['category']).filter(
                        form__in=query['form'])
            elif 'category' in query:
                lip = Lip.objects.filter(category__in=query['category'])
            else:
                lip = Lip.objects.filter(form__in=query['form'])

        try:
            color_option = query['color']
            lip = lip.exclude(
                color__isnull=True
            )

            for i in lip:
                lipss = LipOption.objects.filter(product=i).filter(
                    color__in=color_option
                )
                if len(lipss) == 0:
                    lip = lip.exclude(name=i.name)
        except KeyError:
            color_option = None

        lipserializer = LipSerializer(lip, many=True, context=color_option)
        return JsonResponse(lipserializer.data, safe=False)

    return HttpResponseNotAllowed(['GET'])
