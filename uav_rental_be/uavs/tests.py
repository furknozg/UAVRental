from django.test import TestCase

# Create your tests here.
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.urls import reverse
from .models import UAV
from accounts.models import CustomUser



class UAVAPITests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.client.force_authenticate(user=self.user)
        self.uav_data = {'brand': 'TestBrand', 'model': 'TestModel', 'weight': 10.5, 'category': 'TestCategory'}

    def test_create_uav(self):
        url = reverse('uav-create') 
        data = {
            'brand': 'SampleBrand',
            'model': 'SampleModel',
            'weight': 50.5,
            'category': 'SampleCategory'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UAV.objects.count(), 1)
        self.assertEqual(UAV.objects.get().brand, 'SampleBrand')
    
    def test_create_uav_without_authentication(self):
        self.client.force_authenticate(user=None)  # Ensure no user is authenticated
        url = reverse('uav-create')  # Assuming you have named the URL pattern for UAVCreate as 'uav-create'
        data = {
            'brand': 'SampleBrand',
            'model': 'SampleModel',
            'weight': 50.5,
            'category': 'SampleCategory'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(UAV.objects.count(), 0)  # Ensure no UAV is created without authentication

    def test_retrieve_uav(self):
        uav = UAV.objects.create(owner=self.user, **self.uav_data)
        response = self.client.get(f'/api/uavs/{uav.id}/retrieve/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_uav(self):
        uav = UAV.objects.create(owner=self.user, **self.uav_data)
        updated_data = {'brand': 'UpdatedBrand', 'model': 'UpdatedModel', 'weight': 20.5, 'category': 'UpdatedCategory'}
        response = self.client.put(f'/api/uavs/{uav.id}/update/', updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        uav.refresh_from_db()
        self.assertEqual(uav.brand, updated_data['brand'])

    def test_delete_uav(self):
        uav = UAV.objects.create(owner=self.user, **self.uav_data)
        response = self.client.delete(f'/api/uavs/{uav.id}/delete/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(UAV.objects.filter(id=uav.id).exists())

    def test_list_user_uavs(self):
        uav1 = UAV.objects.create(owner=self.user, **self.uav_data)
        uav2 = UAV.objects.create(owner=self.user, brand='AnotherBrand', model='AnotherModel', weight=15.5, category='AnotherCategory')
        response = self.client.get('/api/uavs/user/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_available_uavs(self):
        uav1 = UAV.objects.create(owner=self.user, **self.uav_data)
        uav2 = UAV.objects.create(owner=self.user, brand='AnotherBrand', model='AnotherModel', weight=15.5, category='AnotherCategory', is_available=False)
        response = self.client.get('/api/uavs/list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)