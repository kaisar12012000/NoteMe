const mongoose = require("mongoose");

const notesModel = mongoose.Schema({
    notesId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    notesContent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        required: true
    }
})

notesModel.statics.deleteNotesByNoteIdUserId = async function (userId, notesId) {
    const notes = await this.deleteOne({notesId: notesId, userId: userId})
    return notes
}

notesModel.statics.getNotes = async function (userId) {
    const notes = await this.find({userId: userId});
    if(!notes) {
        throw Error("Notes not found");
    }
    return notes;
}

notesModel.statics.getNotesByNotesId = async function (notesId) {
    const notes = await this.findOne({notesId: notesId});
    if(!notes) {
        Error(`Notes with noteId=${notesId} not found`);
    }
    return notes;
}

notesModel.statics.searchNotes = async function (userId, query) {
    // const index = await this.createIndex({notesContent: "text"})
    const notes = await this.find({userId: userId, $text: {$search: query}})
    if(!notes) {
        Error(`Notes with noteId=${notesId} not found`);
    }
    return notes;
}

notesModel.statics.updateNotes = async function(userId, notesId, notesContent){
    const notes = await this.updateOne({userId: userId, notesId: notesId},{$set: {notesContent: notesContent, updatedAt: Date.now()}})
    if(!notes) {
        throw Error("Failed to update")
    }
    return notes
}

const notes = mongoose.model("Notes", notesModel)

module.exports = notes