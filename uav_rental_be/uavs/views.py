from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrReadOnly
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from rentals.models import Rental
from .models import UAV
from rentals.serializers import RentalSerializer
from .serializers import UAVSerializer

# TODO: Do authentication to associate a user with that specific uav

# UAV api
class UAVCreate(generics.CreateAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        # Set the owner field of the UAV instance to the current user
        request.data['owner'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        # Set the owner field of the UAV instance to the current user
        serializer.save(owner=self.request.user, is_available=True)

class UAVRetrieve(generics.RetrieveAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

class UAVUpdate(generics.UpdateAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    
    def perform_update(self, serializer):
        instance = self.get_object()

        # Verify if the request sender is the owner of the UAV
        if instance.owner != self.request.user:
            raise PermissionDenied("You are not allowed to update this UAV.")

        serializer.save()

class UAVDelete(generics.DestroyAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

    def perform_destroy(self, serializer):
        instance = self.get_object()

        # Verify if the request sender is the owner of the UAV
        if instance.owner != self.request.user:
            raise PermissionDenied("You are not allowed to update this UAV.")

        serializer.save()

class UserUAVList(generics.ListAPIView):
    serializer_class = UAVSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter the queryset to only include UAVs associated with the current user
        return UAV.objects.filter(owner=self.request.user)

class AvailableUAVList(generics.ListAPIView):
    serializer_class = UAVSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter the queryset to only include UAVs where no renter is present
        return UAV.objects.filter(is_available=True)


