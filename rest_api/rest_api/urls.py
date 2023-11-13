"""
URL configuration for rest_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from listings.api.views import ListingList, ListingCreate, ListingDetail, ListingDelete
from users.api.views import ProfileList, ProfileDetail, ProfileUpdate

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/listings/', ListingList.as_view()),
    path('api/listings/create', ListingCreate.as_view()),
    path('api/listings/<int:pk>/', ListingDetail.as_view()),
    path('api/listings/<int:pk>/delete/', ListingDelete.as_view()),
    path('api/profiles/', ProfileList.as_view()),
    path('api/profiles/<int:seller>/', ProfileDetail.as_view()),
    path('api/profiles/<int:seller>/update/', ProfileUpdate.as_view()),
    path('api-auth-djoser/', include('djoser.urls')),
    path('api-auth-djoser/', include('djoser.urls.authtoken')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # print(urlpatterns)