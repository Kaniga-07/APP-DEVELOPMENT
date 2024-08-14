from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Contact(models.Model):
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.email


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
    
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_active = models.BooleanField(default=True)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Unique related_name for groups
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # Unique related_name for user_permissions
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

    def __str__(self):
        return self.username

class Payment(models.Model):
    card_number = models.CharField(max_length=16)
    expiration_month = models.IntegerField()
    expiration_year = models.IntegerField()
    cardholder_name = models.CharField(max_length=100)
    billing_address = models.TextField()

    def __str__(self):
        return f"{self.cardholder_name} - {self.card_number[-4:]}"

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField(max_length=200)  # URL for the teacher's profile image
    hours = models.IntegerField()  # Number of hours for the lesson
    rate = models.DecimalField(max_digits=10, decimal_places=2)  # Rate per hour

    def __str__(self):
        return self.name