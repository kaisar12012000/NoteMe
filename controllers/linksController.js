require("dotenv").config()
const {v4: uuid4} = require("uuid")
const User = require("../models/usersModel")
const Notes = require("../models/notesModel")
const Links = require("../models/linksModel")
const resData = {
    code: 0,
    data: {},
    error: {}
}

const generateLink = (userAId, userBId, notesId) => {
    let chars = userAId.replace("-", "")+userBId.replace("-", "")+notesId.replace("-", "")
    let linkcode = "";

    let counter = 0;
    while(counter < 9) {
        linkcode += chars.charAt(Math.floor(Math.random()*chars.length));
        counter += 1
    }

    return linkcode
}

module.exports.generateSharableLink = async (req, res) => {
    const userAId = req?.params?.userId
    const notesId = req?.params?.id

    const userB = await User.getUserByEmail(req?.body?.userBEmail)

    if(!userB) {
        resData.error = {
            message: "User not found. Please check the email.",
            code: 400
        }
        resData.code = 400
        res.status(400).json(resData)
        return
    } 
    
    const notes = await Notes.getNotesByNotesId(notesId)
    
    if(!notes) {
        resData.error = {
            message: "Notes not found.",
            code: 400
        }
        resData.code = 400
        res.status(400).json(resData)
        return
    } 

    const linkcode = generateLink(userAId, userB.userId, notesId);
    console.log(linkcode)

    const linkDoc = {
        linkId: uuid4(),
        userAId,
        userBId : userB.userId,
        notesId,
        linkcode: linkcode,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    const link = await Links.create(linkDoc)

    resData.data = {link}
    resData.code = 200
    res.status(200).json(resData)

}