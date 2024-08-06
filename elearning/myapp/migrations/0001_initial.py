# Generated by Django 5.0.7 on 2024-08-05 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_number', models.CharField(max_length=16)),
                ('expiration_month', models.IntegerField()),
                ('expiration_year', models.IntegerField()),
                ('cardholder_name', models.CharField(max_length=100)),
                ('billing_address', models.TextField()),
            ],
        ),
    ]
