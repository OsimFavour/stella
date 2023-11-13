from rest_framework import serializers
from ..models import Listing, PointOfInterest
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()
    seller_agency_name = serializers.SerializerMethodField()
    listing_point_of_interests_within_10km = serializers.SerializerMethodField()

    # To list all the point of interest in our application
    # in our listings api
    def get_listing_point_of_interests_within_10km(self, obj):
        listing_location = Point(obj.latitude, obj.longitude, srid=4326)
        # lte stands for less than or equal to
        query = PointOfInterest.objects.filter(location__distance_lte=(listing_location, D(km=10)))
        serialize_query = PointOfInterestSerializer(query, many=True)
        return serialize_query.data

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

    
class PointOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = '__all__'