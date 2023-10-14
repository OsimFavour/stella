from django.contrib import admin
from .models import Listing
from .forms import ListingsForm

class ListingAdmin(admin.ModelAdmin):
    form = ListingsForm


admin.site.register(Listing, ListingAdmin)