def serializePosts(posts):
    arr = []
    for post in posts:
        item = {
            'id' : post.id,
            'author' : post.author,
            'title' : post.title,
            'content': post.content,
            'image' : post.images,
            'publicationdate' : post.publicationdate,
            'likecounter': post.likeCounter
        }
        arr.append(item)
    return arr