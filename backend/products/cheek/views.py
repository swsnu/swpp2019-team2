""" CHEEK VIEWS """
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Cheek, CheekOption
from .serializers import CheekSerializer


def search(request, option):
    """ TODO : DOCSTRING"""
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)
        if 'category' not in query:
            cheek = Cheek.objects.all()
        else:
            try:
                color_option = query['color']
                cheek = Cheek.objects.exclude(
                    color__isnull=True
                )  # only Blusher
                for i in cheek:
                    cheeks = CheekOption.objects.filter(product=i).filter(
                        color__in=color_option
                    )
                    if len(cheeks) == 0:
                        cheek = cheek.exclude(name=i.name)
                data1 = CheekSerializer(cheek, many=True, context=color_option)
                query['category'].remove('CHK_B')
                cheek = Cheek.objects.filter(
                    category__in=query['category']
                )
                data2 = CheekSerializer(cheek, many=True, context=None)
                return JsonResponse(data1.data + data2.data, safe=False)

            except KeyError:
                cheek = Cheek.objects.filter(
                    category__in=query['category']
                )
        cheekserializer = CheekSerializer(cheek, many=True, context=None)
        return JsonResponse(cheekserializer.data, safe=False)

    return HttpResponseNotAllowed(['GET'])
