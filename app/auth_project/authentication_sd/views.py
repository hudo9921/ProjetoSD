from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializer import *

# Create your views here.
class UserInfoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)