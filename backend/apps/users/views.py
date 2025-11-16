from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
# from rest_framework.authtoken.models import Token
from .serializers import RegistrationSerializer, LoginSerializer
import logging


logger = logging.getLogger(__name__)

# Create your views here.

class registerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Log incoming raw body for troubleshooting JSON parse errors
        try:
            logger.debug("register request.data: %s", request.data)
        except Exception:
            logger.debug("register called — unable to log request.data")

        # Safely access parsed data and handle JSON parse errors to log raw body
        try:
            parsed_data = request.data
        except ParseError as e:
            raw = request.body.decode("utf-8", errors="replace")
            logger.error("JSON parse error on register: %s", raw)
            return Response({"detail": "Invalid JSON payload"}, status=status.HTTP_400_BAD_REQUEST)

        serializers = RegistrationSerializer(data=parsed_data)
        if serializers.is_valid():
            user = serializers.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "id": user.id,
                    "fullName": user.full_name,
                    "email": user.email,
                    "role": user.role,
                },
                "token": token.key,
            }, status=status.HTTP_201_CREATED)

        # Log validation errors to diagnose 400 responses
        logger.warning("register validation errors: %s", serializers.errors)
        logger.debug("register serializer errors: %s", serializers.errors)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
       
class loginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            logger.debug("login request.data: %s", request.data)
        except Exception:
            logger.debug("login called — unable to log request.data")

        try:
            parsed_data = request.data
        except ParseError:
            raw = request.body.decode("utf-8", errors="replace")
            logger.error("JSON parse error on login: %s", raw)
            return Response({"detail": "Invalid JSON payload"}, status=status.HTTP_400_BAD_REQUEST)

        serializers = LoginSerializer(data=parsed_data)
        if serializers.is_valid():
            user = serializers.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                "user": {
                    "id": user.id,
                    "fullName": user.full_name,
                    "email": user.email,
                    "role": user.role,
                },
                "token": token.key,
            }, status=status.HTTP_200_OK)

        logger.debug("login serializer errors: %s", serializers.errors)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)