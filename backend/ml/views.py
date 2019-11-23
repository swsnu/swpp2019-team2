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

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def read_file(self, request, *args, **kwargs):
        file = FileSerializer(data=request.data)
        if file.is_valid():
            file.save()
            picture = file.data
            rgb = tone_analysis(picture)
            ml = ML(file=picture, result=rgb)
            ml.save()
            response_dict = {'result':ml.result}
            return JsonResponse(response_dict, status=201)
        else:
            return Response(file.errors, status=status.HTTP_400_BAD_REQUEST)
