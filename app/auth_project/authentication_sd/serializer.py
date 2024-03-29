from rest_framework import serializers
from .models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['last_login', 'password', 'active', 'admin', 'staff']
