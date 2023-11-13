from django.contrib import admin
from .models import Listing
from .models import PointOfInterest
from .forms import PointOfInterestsForm

# from .forms import ListingsForm

# class ListingAdmin(admin.ModelAdmin):
#     form = ListingsForm


# admin.site.register(Listing, ListingAdmin)


class PointOfInterestAdmin(admin.ModelAdmin):
    form = PointOfInterestsForm


# admin.site.unregister(Listing)
admin.site.register(Listing) 
admin.site.register(PointOfInterest, PointOfInterestAdmin)