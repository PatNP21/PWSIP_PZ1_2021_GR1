from django.urls import path

from posts.views import createpost, getpost, getUserPosts, getSelfPosts,deletePost,likePost,getPosts
app_name = 'posts'
urlpatterns = [
    path("createpost/", createpost, name = "createpost"),
    path("get/idpost/<str:idpost>/", getpost, name = "getpost"),
    path("get/page/<int:page>/", getPosts, name = "getPosts"),
    path("get/userposts/<str:author>/", getUserPosts, name = 'getUserPosts'),
    path("get/myposts/", getSelfPosts, name = 'getSelfPosts'),
    path("delete/<str:idpost>/", deletePost, name = 'deletePost'),
    path("like/<str:idpost>/", likePost, name = "likePost"),
    
]
