from django.urls import path
from cosmos import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('token/', views.token, name='token'),
    path('lip/', views.lip, name='lip'),
]