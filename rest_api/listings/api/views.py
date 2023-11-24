from .serializers import ListingSerializer
from ..models import Listing
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.views import APIView
from django.contrib.postgres.search import SearchVector, SearchQuery

class ListingList(ListAPIView):
    queryset = Listing.objects.all().order_by('-date_posted')
    serializer_class = ListingSerializer

    def get_queryset(self):
        search_queryset = Listing.objects.all()
        listing_type = self.request.query_params.get('listing_type')
        area = self.request.query_params.get('area')
        borough = self.request.query_params.get('borough')
        price = self.request.query_params.get('price')
        # search = self.request.query_params.get('search')
        vector = SearchVector('listing_type', 'description')
        query = SearchQuery(listing_type)
        search_queryset = search_queryset.annotate(listing_type=vector).filter(
                listing_type=query,
                area=area,
                borough=borough,
                price__lte=price
            )
        # search_queryset.annotate(listing_type=vector).filter(
        #     listing_type=query,
        #     area=area,
        #     borough=borough,
        #     price__lte=price
        # )
        search_result = ListingSerializer(search_queryset, many=True)
        print(f'Search QuerySet: {search_result}')
        # return search_result.data
        return search_queryset


class ListingCreate(CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingDetail(RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingDelete(DestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingUpdate(UpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


# class SearchListingView(APIView):
#     queryset = Listing.objects.all()
#     serializer_class = ListingSerializer

    # def get_queryset(self):
    #     search_queryset = Listing.objects.all()
    #     listing_type = self.request.query_params.get('listing_type')
    #     area = self.request.query_params.get('area')
    #     borough = self.request.query_params.get('borough')
    #     price = self.request.query_params.get('price')
    #     # search = self.request.query_params.get('search')
    #     vector = SearchVector('title')
    #     query = SearchQuery(search)
    #     if search_queryset.annotate(search=vector).filter(
    #             search=query,
    #             listing_type=listing_type,
    #             area=area,
    #             borough=borough,
    #             price__lte =price
    #         ).exists():
    #             search_queryset.annotate(
    #                 search=vector
    #                 ).filter(
    #                 search=query,
    #                 listing_type=listing_type,
    #                 area=area,
    #                 borough=borough,
    #                 price__lte=price
    #             )
    #             search_result = ListingSerializer(search_queryset, many=True)
    #             print(f'Search QuerySet: {search_result}')
    #             # return search_result.data
    #     return search_queryset
    