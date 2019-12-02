""" TODO : DOCSTRING"""
from rest_framework import serializers
from .models import Cheek, CheekOption

class CheekOptionSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    class Meta:
        """ TODO : DOCSTRING"""
        model = CheekOption
        fields = ['color', 'sub_color', 'color_hex', 'optionName']


class CheekSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    brand = serializers.StringRelatedField()
    color = serializers.SerializerMethodField('colors')

    def colors(self, cheek):
        """ TODO : DOCSTRING"""
        return None

    class Meta:
        model = Cheek
        fields = [
            'name',
            'price',
            'category',
            'product_url',
            'img_url',
            'brand',
            'color',
            'id'
        ]
