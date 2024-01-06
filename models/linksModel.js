const mongoose = require("mongoose")

const linksModel = mongoose.Schema({
    linkId: {
        type: String,
        require: true
    },
    notesId: {
        type: String,
        require: true
    },
    userAId: {
        type: String,
        require: true
    },
    userBId: {
        type: String,
        require: true
    },
    linkcode: {
        type: String,
        require: true
    },
    createdAt: {
        type: Number,
        require: true
    },
    updatedAt: {
        type: Number,
        require: true
    }
})

const links = mongoose.model("Links", linksModel)

module.exports = links