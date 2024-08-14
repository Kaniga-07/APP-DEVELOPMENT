import logging
import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Contact, ContactMessage, Payment
from .serializers import PaymentSerializer,Teacher
from .serializers import TeacherSerializer
logger = logging.getLogger(__name__)

class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class TeacherRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

@require_http_methods(["GET", "POST"])
@csrf_exempt  # Exempt from CSRF for testing; in production, use proper CSRF handling
def contact_view(request):
    if request.method == "GET":
        try:
            contact = Contact.objects.first()
            if contact:
                contact_data = {
                    "address": contact.address,
                    "email": contact.email,
                    "phone": contact.phone,
                }
                return JsonResponse(contact_data)
            else:
                return JsonResponse({"error": "Contact information not found."}, status=404)
        except Exception as e:
            logger.exception("An error occurred while fetching contact information.")
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            ContactMessage.objects.create(
                name=data.get("name"),
                email=data.get("email"),
                subject=data.get("subject"),
                message=data.get("message"),
            )
            return JsonResponse({"success": "Message sent successfully!"}, status=201)
        except Exception as e:
            logger.exception("An error occurred while saving contact message.")
            return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST', 'GET'])
def signup(request):
    if request.method == 'POST':
        try:
            data = request.data

            # Check if username already exists
            if User.objects.filter(username=data['username']).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if email already registered
            if User.objects.filter(email=data['email']).exists():
                return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

            # Create new user
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
            user.save()

            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.exception("An error occurred during signup.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'GET':
        try:
            users = User.objects.all()
            users_data = [{'username': user.username, 'email': user.email} for user in users]

            return Response(users_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.exception("An error occurred while retrieving users.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    try:
        data = request.data
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.exception("An error occurred during login.")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def save_payment(request, pk=None):
    if request.method == 'GET':
        try:
            payments = Payment.objects.all()
            serializer = PaymentSerializer(payments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception("An error occurred while retrieving payments.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            serializer = PaymentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception("An error occurred while saving payment.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            payment = Payment.objects.get(pk=pk)
            serializer = PaymentSerializer(payment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception("An error occurred while updating payment.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            payment = Payment.objects.get(pk=pk)
            payment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception("An error occurred while deleting payment.")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
