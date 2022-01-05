from drawit.settings import MEDIA_ROOT
from scripts.generateRandomString import generateRandomString
def saveFile(file) -> str:
    ext = file.name.split('.')[1]
    filename = generateRandomString()+'.'+ext
    fullpath = str(MEDIA_ROOT) +'\\'+ filename
    with open(fullpath, 'wb+') as dest:
        for chunk in file.chunks():
            dest.write(chunk)
    return filename