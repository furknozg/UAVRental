from django.urls import path
from .views import (
    UAVCreate,
    UAVRetrieve,
    UAVUpdate,
    UAVDelete,
    UserUAVList,
    AvailableUAVList,
    

    
)


urlpatterns = [
    path('uavs/create/', UAVCreate.as_view(), name='uav-create'),
    path('uavs/user/', UserUAVList.as_view(), name='user-uav-list'),
    path('uavs/list/', AvailableUAVList.as_view(), name='uav-list'),
    path('uavs/<int:pk>/retrieve/', UAVRetrieve.as_view(), name='uav-retrieve'),
    path('uavs/<int:pk>/update/', UAVUpdate.as_view(), name='uav-update'),
    path('uavs/<int:pk>/delete/', UAVDelete.as_view(), name='uav-delete'),
    
   
]