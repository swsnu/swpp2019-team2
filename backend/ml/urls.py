from django.urls import path
from .views import *

urlpatterns = [
    path('ml/', FileUploadView.as_view(), name="ML"),
]
