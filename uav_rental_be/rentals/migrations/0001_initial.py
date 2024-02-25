# Generated by Django 5.0.2 on 2024-02-24 18:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('uavs', '0003_delete_rental'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Rental',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('renter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rented_rentals', to=settings.AUTH_USER_MODEL)),
                ('uav', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='uavs.uav')),
            ],
        ),
    ]
