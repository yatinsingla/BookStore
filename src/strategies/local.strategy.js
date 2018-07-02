const passport = require('passport');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

const db = mongoose.connect('mongodb://localhost/bookAPI');

module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password',
        }, (username, password, done)=>{
            //const userCurrent = userModel({username, password});
            const user = userModel.findOne({username: {$eq: username}}, (err, user)=>{
                console.log(user.username);
                if (user == null) {
                    console.log('no such user');
                } else if (user.password === password){
                    console.log("user: " + user);
                    console.log('correct user');
                    done(null, user);
                } else if (user.password != password){
                    console.log('incorrect password');
                    done(null, false);
                }
            });
        }
    ))
}