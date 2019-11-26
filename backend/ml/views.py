"""VIEW MODEL"""

import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .face_color_ml import tone_analysis
from .serializers import FileSerializer
from .models import ML
from products.base import models as Base_models
from .face_color_ml import tone_analysis
from .find_base import best_match

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def get(self, request):
        mls = ML.objects.all()
        serializer = FileSerializer(mls, many=True)
        return Response(serializer.data)

    def post(self, request):
        file = FileSerializer(data=request.data)
        if file.is_valid():
            file.save()
            return Response(file.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            body = request.body.decode()
            u_id = json.loads(body)['userID']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        ml_object = ML.objects.filter(user_id=u_id).latest('id')
        ml_object.result = tone_analysis(ml_object.image)
        ml_object.save()
        base_products = Base_models.Base.objects.filter(category='F')
        base_products_info = []
        total_base_products_info = Base_models.BaseOption.objects.all()
        for p in base_products.all():
            for q in total_base_products_info:
                if q.product == p:
                    base_products_info.append(q)

        #base_products_info = Base_models.BaseOption.objects.filter(product=base_products.all())
        base_products_hexa = [i.color_hex for i in base_products_info]
        best_product = best_match(base_products_hexa, ml_object.result)
        final = base_products_info[best_product]
        ml_object.base = str(final.product) + " " + final.optionName
        ml_object.product = base_products.filter(name=final.product)
        ml_object.save()
        response_dict = {'id':ml_object.id, 'user_id':ml_object.user_id, 'result':ml_object.result, 'base':ml_object.base}
        return JsonResponse(response_dict, status=201)
