
const { Router } = require('express');
const data = require('../data');
const fs = require("fs");
const router = Router();
const pool = require('../config/db/database');
const session = require('express-session');
const Handlebars = require('handlebars');
const { title } = require('process');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


Handlebars.registerHelper('pag', function (a, b) {
    return a === b;
});

Handlebars.registerHelper('rank', function (a, b) {
    return a === b;
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    res.render("auth/login", {
        title: "ClosetVR",
        layout: 'login',
        style: '/app/css/login.css',
        message: req.flash('error')
    });
});


// Register Post
router.post('/register', async (req, res) => {
    const { mail, password } = req.body;

    try {
        const [emailExist] = await pool.promise().query(`SELECT COUNT(*) AS count FROM usuarios WHERE correo = ?`, [mail]);
        if (emailExist[0].count > 0) {
            return res.status(400).json({ error: 'El correo ya esta en uso.' });
        }

        const encryptPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.promise().query(`INSERT INTO cor (mail, password) VALUES (?, ?)`, [mail, encryptPassword]);

        const [user] = await pool.promise().query(`SELECT * FROM users WHERE Id = ?`, [result.insertId]);
        console.log('User obtained from the database:', user); 
        req.login(user[0], (err) => { 
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ error: 'Failed to log in automatically.' });
            }
            return res.redirect('/');
        });
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal error, please contact the administrator.' });
    }
});


// Login Post 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error en passport.authenticate:', err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }

        if (!user) {
            console.warn('Usuario no encontrado:', info);
            return res.status(400).json({ error: info?.message || 'Credenciales inválidas.' });
        }

        req.login(user, (err) => {
            if (err) {
                console.error('Error en req.login:', err);
                return res.status(500).json({ error: 'Error al iniciar sesión.' });
            }

            return res.status(200).json({ message: 'Login exitoso.' });
        });
    })(req, res, next);
});



router.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;