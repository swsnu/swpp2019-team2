""" TODO : DOCSTRING"""
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Base
from .serializers import BaseSerializer




def search(request, option):
    """ TODO : DOCSTRING"""
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)
        if 'category' in query:
            base = Base.objects.filter(category__in=query['category'])
        else:
            base = Base.objects.all()

        try:
            color_option = query['color']
            base = base.exclude(
                color__isnull=True
            )
        except KeyError:
            color_option = None
        try:
            subcolor_option = query['subcolor']
            base = base.exclude(
                color__isnull=True
            )
        except KeyError:
            subcolor_option = None

        baseserializer = BaseSerializer(base, many=True, context={'color':color_option, 'sub_color':subcolor_option})
        result = [x for x in baseserializer.data if len(x['color']) > 0] 
        return JsonResponse(result, safe=False)

    return HttpResponseNotAllowed(['GET'])
