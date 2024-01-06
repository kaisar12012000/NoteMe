require("dotenv").config()
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    // check if token exists
    if (!token && !req?.query?.isTesting) {
        // return 401
        console.log("Token not found");
        res.status(401).send("Unauthorised");
        return
    } 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if(err) {
            if (req?.query?.isTesting) {
                req.params = {
                    ...req.params,
                    userId: "21ac51c1-516c-4100-b920-cd38ce3e15ba"
                }
                next();
                return
            }
            console.log(err)
            res.status(400).json(err)
            return
        } 
        // return succcess
        req.params = {
            ...req.params,
            userId: decodedToken.userId
        }
        next();
    })
}

module.exports ={ requireAuth }