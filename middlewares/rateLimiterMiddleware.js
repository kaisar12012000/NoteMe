const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15*60*1000, // 15 min window
    max: 20, // max 5 reqs in 15 mins window
    message: "Too many requests, please try again later."
})

module.exports = limiter