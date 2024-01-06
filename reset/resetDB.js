db.users.drop()
db.notes.drop()
db.links.drop()

const dummyUsers = [
    {
        "userId": "21ac51c1-516c-4100-b920-cd38ce3e15ba",
        "name": "Test Dummy User1",
        "email": "testDummyUser1@email.com",
        "password": "$2b$10$GXykKgC9A3xXLRjMpvvieOHXOCzSfIThbPqyMng6mFk2KutZWy/4i",
        "createdAt": 12345678900
    },
    {
        "userId": "ef8063f0-cc3a-411d-9466-cbbd4b482e36",
        "name": "Test Dummy User2",
        "email": "testDummyUser2@email.com",
        "password": "$2b$10$FqPbZ6b5DEnqEeB6OAJMnOvUrkRUkzNTniSu2nfSgnbzMYJfHDpey",
        "createdAt": 10234567890
    }
]

const dummyNotes = [
    {
        "notesId": "764376a9-f7ad-4aac-ab99-4aff32eb7a4c",
        "userId": "21ac51c1-516c-4100-b920-cd38ce3e15ba",
        "notesContent": "This is a dummy notes that I want to add for testing 1.",
        "createdAt": 1704436207393,
        "updatedAt": 1704436207393,
    },
    {
        "notesId": "764376a9-ab99-a4ac-f7ad-4aff32eb7a4c",
        "userId": "ef8063f0-cc3a-411d-9466-cbbd4b482e36",
        "notesContent": "This is a dummy notes that I want to add for testing 2.",
        "createdAt": 1704436207393,
        "updatedAt": 1704436207393,
    }
]

const dummyLink = {
    "linkId": "1513a748-f102-4f9f-b8de-c45efb6bc45d",
    "notesId": "764376a9-f7ad-4aac-ab99-4aff32eb7a4c",
    "userAId": "21ac51c1-516c-4100-b920-cd38ce3e15ba",
    "userBId": "ef8063f0-cc3a-411d-9466-cbbd4b482e36",
    "linkcode": "ef8063f0",
    "createdAt": 1704436334977,
    "updatedAt": 1704436334977
  }

db.users.insertMany(dummyUsers)
db.notes.insertMany(dummyNotes)
db.links.insertOne(dummyLink)
db.notes.createIndex({notesContent: "text"})