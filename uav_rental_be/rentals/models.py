from django.db import models
from accounts.models import CustomUser
from uavs.models import UAV

# Create your models here.

class Rental(models.Model):
    uav = models.ForeignKey(UAV, on_delete=models.CASCADE)
    renter = models.ForeignKey(CustomUser, related_name='rented_rentals', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Rental #{self.id} - UAV: {self.uav}, Renter: {self.renter}, Start Date: {self.start_date}, End Date: {self.end_date}"