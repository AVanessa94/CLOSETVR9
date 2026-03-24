const session = require("express-session");
const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");

module.exports = session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
});

