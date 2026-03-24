
const { Router } = require('express');
const data = require('../data');
const fs = require("fs");
const router = Router();
const pool = require('../config/db/database');
const session = require('express-session');
const Handlebars = require('handlebars');
const { title } = require('process');
const authRoute = require('./auth')

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


Handlebars.registerHelper('pag', function (a, b) {
    return a === b;
});

Handlebars.registerHelper('rank', function (a, b) {
    return a === b;
});



router.get('/', (req, res) => {
    res.render("index", {
        title: "ClosetVR",
        style: '/app/css/main.css',
        user: req.user, 
        message: req.flash('error')
    });
});


module.exports = router;
router.use(authRoute)