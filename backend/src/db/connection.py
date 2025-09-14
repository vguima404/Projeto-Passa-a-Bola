from pymongo import MongoClient

MONGO_URL = "mongodb+srv://gaamiwnl:felipe123@passaabola.v7jhmkc.mongodb.net/?retryWrites=true&w=majority&appName=Passaabola"
 
client = MongoClient(MONGO_URL)
 

db = client["passa_a_bola"]
col = db["users"]
 

col.insert_one({"nome": "teste da silva", "posição": "goleira"})

 

client.close()