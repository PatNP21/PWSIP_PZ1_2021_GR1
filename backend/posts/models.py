from datetime import datetime
from django.db import models

class Post(models.Model):
    author = models.CharField(max_length=30)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)
    images = models.TextField(max_length=500, default='')
    publicationdate = models.DateTimeField(default= datetime(2000,1,1,1,1,1,1))
    likeList = models.TextField(max_length=10000, default='')
    likeCounter = models.IntegerField(default=0)
    visibility = models.BooleanField(default=True)

    def __str__(self):
        name = f"%s id:%s %s"%(self.title, self.id, self.publicationdate)
        return name
    def addLike(self,username):
        self.likeList += username + "/"
        self.likeCounter+=1
        self.save()

    def removeLike(self,username):
        likeList = self.likeList.split('/')
        likeList.pop(likeList.index(username))
        self.likeList = '/'.join(likeList)
        self.likeCounter-=1
        self.save()

    def isLiked(self,username):
        likeList = self.likeList.split('/')
        try:
            likeList.index(username)
            return True
        except ValueError:
            return False

