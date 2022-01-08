from scripts.serializeComments import serializeComments
from comments.models import Comment
def serializePosts(posts):
    arr = []
    for post in posts:
        comments = Comment.objects.filter(post = post)
        item = {
            'id' : post.id,
            'author' : post.author,
            'title' : post.title,
            'content': post.content,
            'image' : post.images,
            'publicationdate' : post.publicationdate,
            'likecounter': post.likeCounter,
            'comments': serializeComments(comments)
        }
        arr.append(item)
    return arr