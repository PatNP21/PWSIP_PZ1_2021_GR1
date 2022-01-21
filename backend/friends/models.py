from django.db import models

# Create your models here.
class UserFriend(models.Model):
    username = models.CharField(max_length=30)
    friendlist = models.TextField()
    blocklist = models.TextField()

    def __str__(self):
        return self.username

    def isBlocked(self,username):
        blocklist = self.blocklist.split('/')
        try:
            blocklist.index(username)
            return True
        except ValueError:
            return False

    
    def isFriend(self,username):
        friendlist = self.friendlist.split('/')
        try:
            friendlist.index(username)
            return True
        except ValueError:
            return False
    def addFriend(self,username):
        self.friendlist += username
        self.friendlist += '/'
        self.save()

    def blockUser(self, username):
        self.blocklist += username
        self.blocklist += '/'
        self.save()

    def removeFriend(self,username):
        friendlist = self.friendlist.split('/')
        friendlist.pop(friendlist.index(username))
        self.friendlist = '/'.join(friendlist)
        self.save()

    def unblockUser(self,username):
        blocklist = self.blocklist.split('/')
        blocklist.pop(blocklist.index(username))
        self.blocklist = '/'.join(blocklist)
        self.save()

    def list(self):
        return self.friendlist.split('/').remove("")

    
    

class FriendRequest(models.Model):
    fromusername = models.CharField(max_length=30)
    tousername = models.CharField(max_length=30)
