from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrReadOnly
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from .models import Rental
from uavs.models import UAV
from .serializers import RentalSerializer
from uavs.serializers import UAVSerializer
from django.core.exceptions import PermissionDenied
# Create your views here.

# Rental model api
class UserRentalList(generics.ListAPIView):
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Rental.objects.filter(renter=user_id)
        
class OwnerRentedUAVList(generics.ListAPIView):
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter rentals based on the owner's ID

        user_id = self.request.user.id
        return UAV.objects.filter(owner=user_id, is_available=False)

class RentalCreate(generics.CreateAPIView):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Set the renter as the current user
        request.data['renter'] = request.user.id

        # Call the super method to create the rental object
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # Check if the UAV associated with the rental is available

        uav_id = serializer.validated_data['uav'].id
        
        # Check if the UAV exists
        try:
            uav = UAV.objects.get(pk=uav_id)
        except UAV.DoesNotExist:
            raise ValidationError("UAV with ID {} does not exist.".format(uav_id))

        # Check if the UAV is available for rent
        if not uav.is_available:
            raise ValidationError("This UAV is not available for rent.")
        if uav.owner == self.request.user:
            raise PermissionDenied("As the owner you can't rent this UAV.")


        # Set the availability of the UAV to False
        uav.is_available = False
        uav.save()

        # Associate the owner (authenticated user) with the rental object being created
        print(self.request)
        serializer.save(renter=self.request.user)

class RentalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def perform_update(self, serializer):
        # Check if the user is the owner of the rental
        rental = self.get_object()
        if rental.renter != self.request.user:
            raise PermissionDenied("You do not have permission to perform this action.")

        # Perform the update
        serializer.save()

    def delete(self, request, *args, **kwargs):
        # Check if the user is the owner of the rental
        rental = self.get_object()
        if rental.renter != self.request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        
        uav = rental.uav
        uav.is_available = True
        uav.save()



        return super().delete(request, *args, **kwargs)
