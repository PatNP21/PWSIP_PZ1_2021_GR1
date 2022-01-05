from random import randrange
def generateRandomString():
    validchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    validcharlen = 61
    sessionid = ''
    for i in range(30):
        sessionid += validchars[randrange(0,validcharlen)]
    return sessionid

