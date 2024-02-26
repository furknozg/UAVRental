from rest_framework import serializers
from .models import Rental

class RentalSerializer(serializers.ModelSerializer):
    uav_name = serializers.CharField(source='uav.brand', read_only=True)
    uav_owner = serializers.CharField(source='uav.owner.username', read_only=True)
    uav = serializers.CharField(source='uav.id', read_only=True)
    renter = serializers.CharField(source='rental.renter', read_only=True)


    class Meta:
        model = Rental
        fields = ['id', 'uav', 'renter', 'uav_name', 'uav_owner', 'start_date', 'end_date']

class RentalCreateSerializer(serializers.ModelSerializer):
    uav_name = serializers.CharField(source='uav.brand', read_only=True)
    uav_owner = serializers.CharField(source='uav.owner.username', read_only=True)
    renter_username = serializers.CharField(source='renter.username', read_only=True)
    class Meta:
        model = Rental
        fields = ['id', 'uav', 'renter_username', 'uav_name', 'uav_owner', 'start_date', 'end_date']


