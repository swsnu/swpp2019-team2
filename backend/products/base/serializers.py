""" TODO : DOCSTRING"""
from rest_framework import serializers
from .models import Base, BaseOption


class BaseOptionSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    class Meta:
        """ TODO : DOCSTRING"""
        model = BaseOption
        fields = ['color', 'sub_color', 'color_hex', 'optionName']


class BaseSerializer(serializers.ModelSerializer):
    """ TODO : DOCSTRING"""
    brand = serializers.StringRelatedField()
    color = serializers.SerializerMethodField('colors')

    def colors(self, base):
        """ TODO : DOCSTRING"""
        base_colors = BaseOption.objects.filter(product=base)
        if self.context['color'] is not None:
            base_colors = base_colors.filter(
                color__in=self.context['color']
            )
        if self.context['sub_color'] is not None:
            base_colors = base_colors.filter(
                sub_color__in=self.context['sub_color']
            )
        serializer = BaseOptionSerializer(instance=base_colors, many=True)
        return serializer.data

    class Meta:
        model = Base
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
