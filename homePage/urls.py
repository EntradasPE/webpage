from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views
from django.contrib.auth import views as auth_views
from .views import comprarPage
from .views import loaderio_verification
#from django.conf.urls import url

urlpatterns = [
    path("", views.homePage, name="homePage"),
    #path("comprar/", comprarPage.as_view(), name="comprarPage"),
    path("comprar/", views.comprar, name="comprarPage"),
    path("resumen/", views.resumen, name="resumenPage"),
    path("tickets/", views.tickets, name="ticketsPage"),
    #path("resumen/", comprarPage.as_view(), name="comprarPage"),
    path("administrar/", views.administrarPage, name="administrarPage"),
    path('descargar_boleto/<entrada_id>/', views.descargar_boleto, name='descargar_boleto'),
    path('descargar_boleto2/<entrada_id>/', views.descargar_boleto2, name='descargar_boleto2'),
    #path('descargar_boleto/<int:entrada_id>/', views.descargar_boleto, name='descargar_boleto'),
    #path('descargar_boleto/(?P<entrada_id>\d+)/$', views.descargar_boleto, name='descargar_boleto'),
    path("escaner/", views.escanerPage, name="escanerPage"),
    path('descargar_boletoQREncriptado/<entrada_id>/', views.descargar_boletoQREncriptado, name='descargar_boletoQREncriptado'),
    path('qr', views.descargarQRPage, name='descargarQRPage'),
    path('signout', views.signout, name="signout"),
    path("login/", views.login_view, name='login'),
]

urlpatterns += staticfiles_urlpatterns()
