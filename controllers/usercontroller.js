const express = require('express');
const router = express.Router()  //const router = require('express').Router();
const sequelize = require('../db');  //not shown in journal 
const User = sequelize.import('../models/user');  //const User = require('../db').import(''../modles/user');
const bcrypt = require("bcryptjs"); //not shown in journal
const jwt = require("jsonwebtoken");


router.post('/register', function (req, res) {  //journal showed create instead of register
    User.create({
        username: req.body.user.username,  //  Journal showed 
        // passwordhash: req.body.user.password,
        passwordhash: bcrypt.hashSync(req.body.user.password, 10)

    })
        .then(function createSuccess(user) {
            let token = jwt.sign({ id: user.id, email: user.username }, process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 });

            res.json({
                user: user,
                message: "User created",
                sessionToken: token

            });

        })
        .catch((err) => res.status(500).json({ error: "user name is required" }));
});

router.post('/login', function (req, res) {

    User.findOne({
        where: {
            username: req.body.user.username
        }
    })
        .then(function loginSuccess(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if(matches) {

                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                        res.status(200).json({
                            user: user,
                            message: "User successfully logged in!",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: "Login Failed" })
                    }
                });
                } else {
                    res.status(500).json({ error: 'User does not exist.' })
                      
                }
            })
            .catch(err => res.status(500).json({ error: "failed to authenicate"+err}))
        });
    module.exports = router;
