const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please provide a userId."],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email."],
        unique: true,
        validate: [isEmail, "Please enter a valid email address!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        unique: true,
        minlength: [6, "Your password is too short!"]
    },
    name: {
        type: String,
        required: [true, "Please provide a name."]
    },
    createdAt: {
        type: Number,
        required: [true, "Please provide a CreatedAt."]
    }
});

userSchema.pre('save', async function (next) {
    // create and attach a salt value to the password
    const saltVal = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, saltVal)
    // hash the password

    next()
})

userSchema.post('save', function(doc, next){
    console.log("user created successfully", doc)
    next()
})

// static functions for Users collection

userSchema.statics.getUserByEmail = async function (email) {
    const user = await this.findOne({email})
    if (!user) {
        Error("User does not exists");
    }
    return user;
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email})
    if (!user) {
        throw Error("User does not exists");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw Error("Password is incorrect!")
    }
    return user;
}

const user = mongoose.model("Users", userSchema);

module.exports = user;