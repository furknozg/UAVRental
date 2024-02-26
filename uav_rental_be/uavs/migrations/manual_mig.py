from django.db import migrations, models

def provide_default_owner(apps, schema_editor):
    UAV = apps.get_model('uavs', 'UAV')
    CustomUser = apps.get_model('accounts', 'CustomUser')  # Adjust the app name as needed

    # Get the default owner (for example, the first CustomUser instance)
    default_owner = CustomUser.objects.first()

    # Set the default owner for existing UAV instances
    for uav in UAV.objects.all():
        uav.owner = default_owner
        uav.save()

class Migration(migrations.Migration):

    dependencies = [
        ('uavs', '0002_auto_20240224_1458'),  # Replace with the dependency from your previous migration
    ]

    operations = [
        migrations.AddField(
            model_name='uav',
            name='owner',
            field=models.ForeignKey(to='accounts.CustomUser', related_name='owned_uavs', null=True, default=None, on_delete=models.CASCADE),  # Set default to None
        ),
        migrations.RunPython(provide_default_owner),  # Run the data migration to set default owner
        migrations.AlterField(
            model_name='uav',
            name='owner',
            field=models.ForeignKey(to='accounts.CustomUser', related_name='owned_uavs', on_delete=models.CASCADE),
        ), ]