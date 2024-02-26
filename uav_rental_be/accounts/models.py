from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Placeholder custom user in case any changes are needed in fields
    class Meta:
        app_label = 'accounts'

    def __str__(self):
        return self.username

# Since custom data interferes with the user_groups and permissions data, it is best kept declared here
CustomUser.groups.field.remote_field.related_name = 'custom_user_groups'
CustomUser.user_permissions.field.remote_field.related_name = 'custom_user_permissions'