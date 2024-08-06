from django.db import models

class Payment(models.Model):
    card_number = models.CharField(max_length=16)
    expiration_month = models.IntegerField()
    expiration_year = models.IntegerField()
    cardholder_name = models.CharField(max_length=100)
    billing_address = models.TextField()

    def __str__(self):
        return f"{self.cardholder_name} - {self.card_number[-4:]}"
