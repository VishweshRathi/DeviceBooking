var jwt = require("jsonwebtoken");
var config = require("./config.js");
var controller = require('./controller/controller');
module.exports.VerifyToken = function (req, res, next) {

    var token = req.body.token || req.header['x-access-token']

    if (token) {
        jwt.verify(token, config.secret, function (error, decoded) {
            if (error) {
                console.log("Verification Failed", error)
                return res.status(401).send(error);
            } else {
                req.decoded = decoded
                console.log("Token Verified Successfully")
                return next();
            }
        })
    } else {
        res.redirect(401, '/login')
    }
};