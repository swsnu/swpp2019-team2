""" TODO : DOCSTRING"""
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Base, BaseOption
from .serializers import BaseSerializer


def search(request, option):
    """ TODO : DOCSTRING"""
    # pylint: disable=too-many-branches
    if request.method == "GET":
        url = urlparse('?' + option)
        query = parse_qs(url.query)
        if 'category' in query:
            base = Base.objects.filter(category__in=query['category'])
        else:
            base = Base.objects.all()

        color_option = None
        subcolor_option = None

        if 'color' in query and 'subcolor' in query:
            color_option = query['color']
            subcolor_option = query['subcolor']

            base = base.exclude(
                color__isnull=True
            )

            for i in base:
                basess = BaseOption.objects.filter(product=i).filter(
                    color__in=color_option
                ).filter(
                    sub_color__in=subcolor_option
                )

                if len(basess) == 0:
                    base = base.exclude(name=i.name)

        elif 'color' in query:
            color_option = query['color']

            base = base.exclude(
                color__isnull=True
            )

            for i in base:
                basess = BaseOption.objects.filter(product=i).filter(
                    color__in=color_option
                )

                if len(basess) == 0:
                    base = base.exclude(name=i.name)

        elif 'subcolor' in query:
            subcolor_option = query['subcolor']

            base = base.exclude(
                color__isnull=True
            )

            for i in base:
                basess = BaseOption.objects.filter(product=i).filter(
                    sub_color__in=subcolor_option
                )

                if len(basess) == 0:
                    base = base.exclude(name=i.name)

        if 'brand' in query:
            base = base.filter(brand__name__in=query['brand'])

        baseserializer = BaseSerializer(
            base, many=True, context={
                'color': color_option, 'sub_color': subcolor_option})
        return JsonResponse(baseserializer.data, safe=False)

    return HttpResponseNotAllowed(['GET'])
