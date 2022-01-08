def serializeComments(posts):
    arr = []
    for post in posts:
        item = {
            'id' : post.id,
            'author' : post.author,
            'content': post.content,
            'publicationdate' : post.publicationdate,
        }
        arr.append(item)
    return arr