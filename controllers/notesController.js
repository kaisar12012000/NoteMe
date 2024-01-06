const Notes = require("../models/notesModel");
const {v4: uuid4} = require("uuid")

var resData = {
    code: 0,
    data: {},
    error:{}
}

module.exports.deleteNotesByNotesIdUserId = async (req, res) => {
    const notesId = req?.params?.id;
    const userId = req?.params?.userId

    const notes = await Notes.deleteNotesByNoteIdUserId(userId, notesId)

    if(!notes?.deletedCount) {
        resData.error = {
            message: `Notes with notesId=${notesId} and userId=${userId} does not exists!`,
            code: 400
        }
        resData.code = 400
    } else {
        resData.code = 204
    }

    res.status(resData.code).send("Notes deleted successfully")
}

module.exports.getAllNotes = async (req, res) => {
    const userId = req?.params?.userId;
    const notes = await Notes.getNotes(userId);
    if (!notes) {
        resData.code=200
        resData.data.notes=[]
    } else {
        resData.code=200
        resData.data.notes=notes
    }

    res.status(resData.code).json(resData)

    
}

module.exports.getNotesByNotesId = async (req, res) => {
    const notesId = req?.params?.id;
    
    const notes = await Notes.getNotesByNotesId(notesId)

    if(!notes) {
        resData.error = {
            message: `Notes with noteId=${notesId} does not exists!`,
            code: 400
        }
        resData.code = 400
    } else {
        resData.data= {notes}
        resData.code = 200
    }

    res.status(resData.code).json(resData)

} 

module.exports.postNotes = async (req, res) => {
    const userId = req?.params?.userId;

    const notesId = uuid4();

    const notes = await Notes.create({userId, notesId, notesContent: req.body.notesContent, createdAt: Date.now(), updatedAt: Date.now()})

    res.status(201).send("Created");

}

module.exports.updateNotesByNoteIdUserId = async (req, res) => {
    const notesId = req?.params?.id;
    const userId = req?.params?.userId

    const notes = await Notes.updateNotes(userId, notesId, req?.body?.notesContent)

    if (!notes) {
        resData.error = {
            message: "Error in updating notes!",
            code: 400
        }
        resData.code = 400
    } else {
        resData.code = 204
    }

    res.status(resData.code).send("Notes updated successfully")
    
}

module.exports.searchNotes = async (req, res) => {
    const userId = req?.params?.userId
    console.log(req.query?.q)
    const query = req.query?.q
    
    const notes = await Notes.searchNotes(userId, query)

    resData.code= 200
    resData.data = {notes}

    res.status(resData.code).json(resData)

}