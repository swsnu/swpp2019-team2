from rest_framework import serializers
from .models import ML

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ML
        fields = "__all__"
