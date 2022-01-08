from django.db import models
from posts.models import Post
class Comment(models.Model):
    author = models.CharField(max_length=30)
    content = models.TextField(max_length=500)
    publicationdate = models.DateTimeField()
    post = models.ForeignKey(Post,on_delete= models.CASCADE)
    
    def __str__(self):
        return str(self.id)
