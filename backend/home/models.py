from datetime import timedelta
from django.utils import timezone
from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    dateofbirth = models.DateField()
    activated = models.BooleanField()
    
    def __str__(self):
        return self.username

    def changepass(self,password):
        self.password = password
        self.save()
    
    def activateuser(self):
        self.activated = True
        self.save()

    
    def changeemail(self,email):
        self.email = email
    
    def changefirstname(self,firstname):
        self.firstname = firstname

    def changelastname(self,lastname):
        self.lastname = lastname

    def changedob(self,dob):
        self.dateofbirth = dob

    def changeprofiledata(self,email,firstname,lastname,dateofbirth):
        if email:
            print(1)
            self.changeemail(email)
        if firstname:
            print(2)
            self.changefirstname(firstname)
        if lastname:
            print(3)
            self.changelastname(lastname)
        if dateofbirth:
            print(4)
            self.changedob(dateofbirth)
        self.save()

class UserActivation(models.Model):
    username = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
     
    def __str__(self):
        return self.username

class Session(models.Model):
    sessionid = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    expires = models.DateTimeField()
    
    def __str__(self):
        return self.username
    
    def isexpired(self):
        if self.expires < timezone.now():
            self.delete()
            return True
        else:
            self.extend()
            return False
    def extend(self):
        print("Session %s extended" % self.sessionid)
        self.expires = timezone.now()+timedelta(minutes=10)
        self.save()

class UserPasswordChange(models.Model):
    username = models.CharField(max_length=30)
    newpass = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
    expires = models.DateTimeField()
     
    def __str__(self):
        return self.username
    
    def expired(self):
        if self.expires < timezone.now():
            self.delete()
            return True
        else:
            return False