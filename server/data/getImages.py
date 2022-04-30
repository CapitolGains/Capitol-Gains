# To run: (inside same directory as python file) python getImages.py

# Imports & getting destination path for images
import pymongo, os, requests, shutil

# Make path to politican Image folder
destPath = os.getcwd()[:-11] + "client/src/components/"
try:
    os.mkdir(destPath + "politicianImages")
    destPath += "politicianImages/"
except:
    print("Directory has already been made")
    destPath += "politicianImages/"

# Connection to MongoDB

dbURI = "" # REPLACE WITH DB CON STRING IN DISCORD
client = pymongo.MongoClient(dbURI)
db = client["senate-trades"]
col = db["uniqueCongress"]
arrayOfImages = []

# Add ID & URL to array
for x in col.find({},{ "_id" : 0, "id" : 1, "mapping" : {"Image" : 1} }):
    arrayOfImages.append(x)

# For each element in array, download image @ URL & name it ID @ destPath + ID
for x in range(0, len(arrayOfImages)):
    id = destPath + str(arrayOfImages[x]["id"])
    url = arrayOfImages[x]["mapping"]["Image"]

    res = r = requests.get(url, stream=True, headers={'User-agent': 'Mozilla/5.0'})
    if res.status_code == 200:
        with open(id,'wb') as f:
            shutil.copyfileobj(res.raw, f)
            print('Image sucessfully Downloaded: ', id)
            f.close()
    else:
        print('Image Couldn\'t be retrieved, error code: ' + str(res.status_code))
