"""VIEW MODEL"""

import json
from json import JSONDecodeError
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from products.base import models as Base_models
from .face_color_ml import tone_analysis
from .serializers import FileSerializer
from .models import ML
from .find_base import best_match

class FileUploadView(APIView):
    """ ML Model View"""
    parser_class = (FileUploadParser,)

    def get(self, request):
        # pylint: disable=no-member
        """ GET """
        mls = ML.objects.all()
        serializer = FileSerializer(mls, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ POST """
        file = FileSerializer(data=request.data)
        if file.is_valid():
            file.save()
            return Response(file.data, status=status.HTTP_201_CREATED)
        return Response(file.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        # pylint: disable=line-too-long,no-member,too-many-locals,no-self-use
        """ PUT """
        try:
            body = request.body.decode()
            u_id = json.loads(body)['userID']
        except(KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        ml_object = ML.objects.filter(user_id=u_id).latest('id')
        ml_object.result = tone_analysis(ml_object.image)
        ml_object.save()
        base_products = Base_models.Base.objects.filter(category='F')
        base_products_info = []
        total_base_products_info = Base_models.BaseOption.objects.all()
        for product1 in base_products.all():
            for product2 in total_base_products_info:
                if product2.product == product1:
                    base_products_info.append(product2)

        #base_products_info = Base_models.BaseOption.objects.filter(product=base_products.all())
        base_products_hexa = [i.color_hex for i in base_products_info]
        best_product = best_match(base_products_hexa, ml_object.result)
        final = base_products_info[best_product]
        ml_object.base = str(final.product) + " " + final.optionName
        ml_object.product = Base_models.Base.objects.get(name=final.product)
        ml_object.save()
        product_info = {'price':ml_object.product.price, 'brand':ml_object.product.brand.name, 'img_url':ml_object.product.img_url}
        response_dict = {'id':ml_object.id, 'user_id':ml_object.user_id, 'r':ml_object.result[0], 'g':ml_object.result[1], 'b':ml_object.result[2], 'base':ml_object.base, 'product':product_info}
        return JsonResponse(response_dict, status=201)
