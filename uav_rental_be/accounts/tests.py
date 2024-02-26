from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from .models import CustomUser
from django.contrib.auth import get_user_model
# Create your tests here.


User = get_user_model()

class UserRegistrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')

    def test_user_registration(self):
        data = {'username': 'testuser', 'password': 'testpassword',  'email': 'test@example.com'}
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser', email='test@example.com').exists())

class UserLoginTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse('login')
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_user_login(self):
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

class CheckTokenTests(TestCase):
    def setUp(self):
        # Needs, existing client data created and a token
        self.client = APIClient()
        self.check_token_url = reverse('test-token')
        self.user = User.objects.create_user(username='testuser', password='testpassword', email= 'test@example.com')
        self.token = Token.objects.create(user=self.user)

    def test_check_token(self):
        # Execute get token url and assert it to equal to the same response as the api url
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(self.check_token_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('pass for test@example.com', response.data)