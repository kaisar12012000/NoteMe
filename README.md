# NoteMe

## Table of contents
1. #### Introduction
2. #### Packages and Libraries
3. #### Installation
4. #### Setup and Usage


## Introduction

A backend app to write and store notes and generating custom links to share with peers.

## Packages and Libraries
1. bcrypt
1. dotenv
1. express
4. express-rate-limit
1. jsonwebtoken 
1. mongoose 
1. uuid 
1. validator
1. mocha
2. should
3. chai
4. request


## Installation
The first step is to clone this repository.
Open command line and run the following command.
```
git clone https://github.com/kaisar12012000/NoteMe.git
```
The next step is to go to the master branch and install all the required packages.
```
cd NoteMe
git checkout master
npm i
```

## Setup and Usage
### Setup
Now that all packages are installed it is time to proceed with the setup.

The first thing is to initialise the database. *We are using mongodb as our database. Make sure you have mongo and mongoShell(optional) already installed.*

In a new terminal inside your project directory run the following commands to initialize the database and collections.
```
cd reset
mongosh #If you've chosen to use mongoShell. An alternative command will be mongo.
use note-me-app
load("resetDB.js") #This will initialize your db with some dummy values.
```
Now your database is ready. It is time to start the server. Open a new termianl in you root directory and run the following command.
```
nodemon server.js
```
The backend server should start at `PORT=3002`.

The next step is to run automation testcases that will ensure if the project is ready to be used. There are **9 unit tests** and **1 integration test** containing 9 sub tests. For the setup to complete all 18 testcases should pass.

To run the tests open new terminal in the root directory and run the following command.
```
mocha
```

Once all testcases pass you are good to use the API's.

### Usage
There are total 9 API's. They are:
1. User Sign Up
1. User Login
1. Get All Notes
1. Get Notes By ID
1. Post Notes
1. Update Notes
1. Delete Notes By ID
1. Share Notes
1. Search Notes

#### User Sign up
- Name: User Sign Up
- Endpoint: http://localhost:3002/api/auth/signup
- method: POST
- Request Body : 
  ```json
  {
     "name": "User Name",
     "email": "userEmail@email.com",
     "password": "user-password"
   }
   ```
- Response Body:
  ```json
  {
     "code": 201,
     "data": {
       "accessToken": "accessTokenValue",
       "refreshToken": "RefreshTokenValue",
       "expiresIn": 31536000,
       "user": {
         "name": "User Name",
         "email": "userEmail@email.com",
         "userId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
         "createdAt": 1234567890
       }
     },
     "error": {}
  }
  ```
#### User Login
- Name: User Login
- Endpoint: http://localhost:3002/api/auth/login
- method: POST
- Request Body : 
  ```json
  {
     "email": "userEmail@email.com",
     "password": "User-password"
   }
   ```
- Response Body:
  ```json
  {
     "code": 200,
     "data": {
       "accessToken": "accessTokenValue",
       "refreshToken": "RefreshTokenValue",
       "expiresIn": 31536000,
       "user": {
         "name": "User Name",
         "email": "userEmail@email.com",
         "userId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
         "createdAt": 1234567890
       }
     },
     "error": {}
  }
  ```
#### Get All Notes
- Name: Get All Notes
- Endpoint: http://localhost:3002/api/notes
- method: GET
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Body:
  ```json
  {
     "code": 200,
     "data": {
       "notes": [
           {
              "_id": "659961b640efcc2df61fe0cd",
              "notesId": "166f9578-011d-4a51-aaa9-b84e45016f14",
              "userId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
              "notesContent": "This is a dummy notes that I want to add for testing 1.",
              "createdAt": 1704550838176,
              "updatedAt": 1704550838176,
              "__v": 0
           }
        ]
     },
     "error": {}
  }
  ```
#### Get Notes By ID
- Name: Get Notes By ID
- Endpoint: http://localhost:3002/api/notes/:id
- method: GET
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Body:
  ```json
  {
     "code": 200,
     "data": {
       "notes": {
              "_id": "659961b640efcc2df61fe0cd",
              "notesId": "166f9578-011d-4a51-aaa9-b84e45016f14",
              "userId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
              "notesContent": "This is a dummy notes that I want to add for testing 1.",
              "createdAt": 1704550838176,
              "updatedAt": 1704550838176,
              "__v": 0
           }
     },
     "error": {}
  }
  ```
#### Post Notes
- Name: Post Notes
- Endpoint: http://localhost:3002/api/notes
- method: POST
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body : 
  ```json
  {
     "notesContent": "This is a dummy notes that I want to add for testing 1."
  }
   ```
- Response Code: 201
#### Update Notes
- Name: Update Notes
- Endpoint: http://localhost:3002/api/notes/:id
- method: PUT
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body : 
  ```json
  {
     "notesContent": "This is a dummy notes that I want to add for testing 1."
  }
   ```
- Response Code: 204
#### Delete Notes By ID
- Name: Delete Notes
- Endpoint: http://localhost:3002/api/notes/:id
- method: DELETE
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Code: 204
#### Share Notes
- Name: Share Notes
- Endpoint: http://localhost:3002/api/notes/:id/share
- method: POST
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body : 
  ```json
  {
     "userBEmail": "browser@email.com" // with whome you want to share. *Should have an account*
  }
   ```
- Response Body: 
  ```json
  {
     "code": 200,
     "data": {
       "link": {
         "linkId": "114203cf-7159-4d6a-9c82-d3be2e4ee2af",
         "notesId": "166f9578-011d-4a51-aaa9-b84e45016f14",
         "userAId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
         "userBId": "21ac51c1-516c-4100-b920-cd38ce3e15ba",
         "linkcode": "7041954ba",
         "createdAt": 1704551688989,
         "updatedAt": 1704551688989,
         "_id": "6599650840efcc2df61fe0d7",
         "__v": 0
       }
     },
     "error": {
       "message": "Notes not found.",
       "code": 400
     }
  }
  ```
#### Search Notes
- Name: Search Notes
- Endpoint: http://localhost:3002/api/search?q=:query
- method: POST
- Request Headers: 
  ```json
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Body: 
  ```json
  {
     "code": 200,
     "data": {
       "notes": [
           {
              "_id": "659961b640efcc2df61fe0cd",
              "notesId": "166f9578-011d-4a51-aaa9-b84e45016f14",
              "userId": "3f8cabaf-d1f0-4a0d-a8ab-a2e5405dafca",
              "notesContent": "This is a dummy notes that I want to add for testing 1.",
              "createdAt": 1704550838176,
              "updatedAt": 1704550838176,
              "__v": 0
           }
        ]
     },
     "error": {}
  }
  ```
