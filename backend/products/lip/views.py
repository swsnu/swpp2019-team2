""" TODO : DOCSTRING"""
from urllib.parse import urlparse, parse_qs
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Lip, LipOption
from .serializers import LipSerializer


def search(request, option):
    """ TODO : DOCSTRING"""
    # pylint: disable=too-many-branches, too-many-nested-blocks
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

        if 'brand' in query:
            lip = lip.filter(brand__name__in=query['brand'])

        subcolor = None
        try:
            color_option = query['color']
            lip = lip.exclude(
                color__isnull=True
            )

            if 'sub_color' in query:
                subcolor = {
                    'LIP_RD': [],
                    'LIP_PU': [],
                    'LIP_OR': [],
                    'LIP_PK': []}
                for color in query['sub_color']:
                    color = color.split('_', 1)
                    color_str = ''.join(['#', color[0]])
                    subcolor[color[1]].append(color_str)

                for i in lip:
                    lipss = []
                    for color in query['color']:
                        tmp = LipOption.objects.filter(product=i).filter(
                            color=color
                        )
                        if len(subcolor[color]) != 0:
                            tmp = tmp.filter(
                                sub_color__in=subcolor[color]
                            )
                        lipss += tmp
                    if len(lipss) == 0:
                        lip = lip.exclude(name=i.name)

            else:
                for i in lip:
                    lipss = LipOption.objects.filter(product=i).filter(
                        color__in=color_option
                    )
                    if len(lipss) == 0:
                        lip = lip.exclude(name=i.name)
        except KeyError:
            color_option = None
        lipserializer = LipSerializer(
            lip, many=True, context={
                'color': color_option, 'sub': subcolor})
        return JsonResponse(lipserializer.data, safe=False)

    return HttpResponseNotAllowed(['GET'])
