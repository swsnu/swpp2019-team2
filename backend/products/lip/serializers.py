""" TODO : DOCSTRING"""
from rest_framework import serializers
from .models import Lip, LipOption


class LipOptionSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    class Meta:
        """ TODO : DOCSTRING"""
        model = LipOption
        fields = ['color', 'sub_color', 'color_hex', 'optionName']


class LipSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    brand = serializers.StringRelatedField()
    color = serializers.SerializerMethodField('colors')

    def colors(self, lip):
        """ TODO : DOCSTRING"""
        if self.context is not None:
            lip_colors = LipOption.objects.filter(product=lip).filter(
                color__in=self.context)
        else:
            lip_colors = LipOption.objects.filter(product=lip)

        serializer = LipOptionSerializer(instance=lip_colors, many=True)
        return serializer.data

    class Meta:
        model = Lip
        fields = [
            'name',
            'price',
            'form',
            'category',
            'product_url',
            'img_url',
            'brand',
            'color',
            'id'
        ]
