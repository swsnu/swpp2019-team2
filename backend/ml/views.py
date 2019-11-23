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

    def get(self, request, *args, **kwargs):
        mls = ML.objects.all()
        serializer = FileSerializer(mls, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        file = FileSerializer(data=request.data)
        if file.is_valid():
            file.save()
            picture = file.data
            rgb = tone_analysis(picture)
            ml = ML(file=picture, result=rgb)
            ml.save()
            return Response(file.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file.errors, status=status.HTTP_400_BAD_REQUEST)
