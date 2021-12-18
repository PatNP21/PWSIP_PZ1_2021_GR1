from django.db import models

class Post(models.Model):
    author = models.CharField(max_length=30)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=500)
    publicationdate = models.DateField()

    def __str__(self):
        name = f"%s %s"%(self.title, self.publicationdate)
        return name
        
