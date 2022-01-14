def serializeFriendRequest(friends):
    arr = []
    for friend in friends:
        arr.append(friend.fromusername)
    return arr