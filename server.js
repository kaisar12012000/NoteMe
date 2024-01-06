/*
1. sign up - post - api/auth/signup
2. login - post - api/auth/login
3. get all notes - get - api/notes
4. get note by id - get - api/notes/:id
5. post notes - post - api/notes
6. update note by id - put - api/notes/:id
7. delete note by id - delete - api/notes/:id
8. share note by id - post - api/notes/:id/share
9. search note - get - api/search?q=:query
11. Rate limiter
12. Automation
 */

const express = require("express");
const users = require("./models/usersModel");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes")
const cookieParser = require("cookie-parser");


mongoose.connect("mongodb://0.0.0.0:27017/note-me-app", {useUnifiedTopology: true})
        .then((result) => {
            console.log("Database online - Connection Successful. \nMongoDB Connected...")
            app.listen(3002)
            console.log("Server started!\nListening to PORT=3002...")
        })
        .catch((e) => {
            console.log("Connection Failed!\nCould not connect to MongoDB.\n", e)
        })


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

app.use(authRoutes)
app.use(notesRoutes)
