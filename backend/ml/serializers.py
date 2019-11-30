""" file serializer """
from rest_framework import serializers
from .models import ML

class FileSerializer(serializers.ModelSerializer):
    """ docstring """
    class Meta:
        """ docstring """
        model = ML
        fields = "__all__"
