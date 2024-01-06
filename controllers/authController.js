require("dotenv").config()
const User = require("../models/usersModel");
const { v4 : uuid4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const maxTokenAge = 365*24*60*60;
var resData = {
    code: 0,
    data: {},
    error: {}
}

const handleErrors = (err) => {
    // edit this function to handle all errors based on the value of err.messsage. then return that error
    console.log(err.message, err.code, 5);
    if (err.message.includes("E11000 duplicate key error collection") && err.code===11000) {
        // email already exits.
        return {
            message: "User already exists! Please login to proceed.",
            errCode: 400
        }
    } else if (err.message.includes("User does not exists")) {
        return {
            message: "User does not exists! Please signup to proceed.",
            errCode: 400
        }
    } else if (err.message.includes("Password is incorrect")) {
        return {
            message: "Password is incorrect!",
            errCode: 400
        }
    }
}

const generateToken = (userId) => {
    return {
        accessToken : jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxTokenAge,
        }),
        refreshToken : jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: maxTokenAge,
        }),
        expiresIn: maxTokenAge
    }
}

module.exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const {accessToken, refreshToken, expiresIn} = generateToken(user.userId);
        resData.code = 200
        resData.data = {
            accessToken,
            refreshToken,
            expiresIn,
            user: {
                name: user.name,
                email: user.email,
                userId: user.userId,
                createdAt: user.createdAt
            }
        }
        resData.error = {}
        return res.status(resData.code).json(resData)
    } catch (error) {
        resData.data = {}
        resData.error = handleErrors(error)
        resData.code = resData.error.errCode
        return res.status(resData.code).json(resData)
    }
    
}

module.exports.signUpController = async (req, res) => {
    const { email, name, password } = req.body

    try {
        let userId = uuid4()
        const user = await User.create({userId, name, email, password, createdAt: 1234567890})
        const {accessToken, refreshToken, expiresIn} = generateToken(user.userId);
        // res.cookie("jwt", token, { httpOnly: true, maxAge: maxTokenAge*1000 })
        resData.code = 201
        resData.data = {
            accessToken,
            refreshToken,
            expiresIn,
            user: {
                name: user.name,
                email: user.email,
                userId: user.userId,
                createdAt: user.createdAt
            }
        }
        resData.error = {}
        res.status(201).json(resData)
    } catch (error) {
        resData.data = {}
        resData.error = handleErrors(error)
        resData.code = resData.error.errCode
        res.status(resData.code).json(resData) // user .json({returnedErr}) to return the error in json form
    }
}