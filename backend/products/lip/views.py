""" TODO : DOCSTRING"""
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Lip, LipOption
from .serializers import LipSerializer


def search(request, option):
    """ TODO : DOCSTRING"""
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)
        lip = Lip.objects.all()
        if 'category' in query:
            lip = lip.filter(category__in=query['category'])
        if 'form' in query:
            lip = lip.filter(form__in=query['form'])

        try:
            color_option = query['color']
            lip = lip.exclude(
                color__isnull=True
            )
            print(lip)

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
