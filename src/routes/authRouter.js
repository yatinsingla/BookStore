const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const {check} = require('express-validator/check');
const bcrypt = require('bcryptjs');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const authRouter = express.Router();

const router = function(userModel, nav){
    authRouter.route('/register')
    .get((req, res)=>{
        var errors = req.validationErrors();
        res.render('register',{
            nav, 
            errors: errors,
            title:'BookStore'
        });
    })
    .post([
        check('username','Username cannot be empty').isLength({min:1}).trim(),
        check('password','Password cannot be empty').isLength({min:1}).trim()
    ],(req, res)=>{
        const {username, password} = req.body;
        const user = new userModel({username, password});

        
        console.log(user);
        var errors = req.validationErrors();
        if (errors) {
            res.render('register',{
                nav,
                title:'BookStore',
                errors: errors
            });
            console.log("errors");
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;
                    //console.log('password: ' + user.password + ', username: ' + user.username);
                    user.save((err)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(user);
                            res.redirect('/auth/login');
                        }
                    });
                });
            });
            
            console.log("no errors");
        }

    })

    authRouter.route('/login')
    .get((req, res)=>{
        res.render('signin', {
            nav, 
            title: 'BookStore'
        })
    })
    .post(passport.authenticate('local', {
        successRedirect: '/book',
        failureRedirect: '/auth/login'
    }))

    authRouter.route('/logout')
    .get((req, res)=>{
        req.logout();
        res.redirect('/');
    })

    authRouter.route('/profile')
    .get((req, res)=>{
        if (req.user) {
            res.json(req.user);
        } else {
            console.log(req.user);
        }
    })

    return authRouter;
}

module.exports = router;