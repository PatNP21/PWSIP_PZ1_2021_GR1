from datetime import datetime, timedelta
from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    DOB = models.DateField()
    
    def __str__(self):
        return self.username

    def changepass(self,password):
        self.password = password


class Session(models.Model):
    sessionid = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    expires = models.DateTimeField(default= datetime.now())
    
    def __str__(self):
        return self.username
    
    def isexpired(self):
        if self.expires < datetime.now():
            self.delete()
            return True
        else:
            return False
    def extend(self):
        self.expires = datetime.now()+timedelta(minutes=10)