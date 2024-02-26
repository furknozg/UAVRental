from django.urls import path

from .views import (# Might migrate into another application
    RentalCreate,
    RentalRetrieveUpdateDestroy,
    UserRentalList,
    OwnerRentedUAVList
    )


urlpatterns = [
     #Create rental
    path('rentals/', RentalCreate.as_view(), name='rental-list-create'),

    # Endpoint for retrieving, updating, and deleting a specific rental
    path('rentals/<int:pk>/', RentalRetrieveUpdateDestroy.as_view(), name='rental-retrieve-update-destroy'),

    # Endpoint for listing rentals associated with the authenticated user, renter or the owner
    path('rentals/user/', UserRentalList.as_view(), name='user-rental-list'),
    path('rentals/owner/', OwnerRentedUAVList.as_view(), name='owner-rental-list'),
]
