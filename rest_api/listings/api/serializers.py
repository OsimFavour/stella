from rest_framework import serializers
from ..models import Listing


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()
    seller_agency_name = serializers.SerializerMethodField()

    def get_seller_agency_name(self, obj):
        return obj.seller.profile.agency_name

    def get_seller_username(self, obj):
        print(f'Seller Property: {obj.seller}\n Seller Username: {obj.seller}')
        return obj.seller.username
    
    def get_country(self, obj):
        return 'Nigeria'
        
    class Meta:
        model = Listing
        fields = '__all__'