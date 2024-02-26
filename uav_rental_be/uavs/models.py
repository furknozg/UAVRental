from django.db import models
from accounts.models import CustomUser

class UAV(models.Model):
    # Also can add additional fields such as ImageField etc.
    owner = models.ForeignKey(CustomUser, related_name='owned_uavs', on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    weight = models.FloatField()
    category = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)  # Indicates whether the UAV is available for rent
    
    def __str__(self):
        return f"{self.brand} {self.model}"

