from rest_framework import serializers
from .models import UAV

class UAVSerializer(serializers.ModelSerializer):
    class Meta:
        model = UAV
        fields = ['id', 'brand', 'model', 'weight', 'category', 'is_available']
        read_only_fields = ['user']  # Ensure 'user' field is read-only

    def create(self, validated_data):
        # Set the 'user' field to the current user when creating a new UAV instance
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

