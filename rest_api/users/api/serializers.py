from rest_framework import serializers
from ..models import Profile
from listings.models import Listing
from listings.api.serializers import ListingSerializer


class ProfileSerializer(serializers.ModelSerializer):
    seller_listings = serializers.SerializerMethodField()

    def get_seller_listings(self, obj):
        query = Listing.objects.filter(seller=obj.seller)
        serialize_listings = ListingSerializer(query, many=True)
        return serialize_listings.data
    
    class Meta:
        model = Profile
        fields = '__all__'