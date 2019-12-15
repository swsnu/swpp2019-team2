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
        if self.context['sub'] is not None:
            subcolor = self.context['sub']
            lip_colors = []
            for color in self.context['color']:
                if len(subcolor[color]) != 0:
                    lip_colors += LipOption.objects.filter(product=lip).filter(
                        color=color
                    ).filter(
                        sub_color__in=subcolor[color]
                    )
                else:
                    lip_colors += LipOption.objects.filter(product=lip).filter(
                        color=color
                    )
        elif self.context['color'] is not None:
            lip_colors = LipOption.objects.filter(product=lip).filter(
                color__in=self.context['color'])
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
