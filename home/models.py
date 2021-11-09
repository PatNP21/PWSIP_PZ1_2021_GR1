from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30,unique = True)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=100,unique=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    DOB = models.DateField()
    