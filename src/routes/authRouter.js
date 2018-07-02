const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const authRouter = express.Router();

const router = function(userModel, nav){
    authRouter.route('/signUp')
    .post((req, res)=>{
        const {username, password} = req.body;
        const user = new userModel({username, password});

        user.save((err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                res.redirect('/auth/login');
            }
        })
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
        res.redirect('/auth/login');
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