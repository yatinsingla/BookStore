const passport = require('passport');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const db = mongoose.connect('mongodb://localhost/bookAPI');

module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true
        }, (req, username, password, done)=>{
            //const userCurrent = userModel({username, password});
            const user = userModel.findOne({username: {$eq: username}}, (err, user)=>{
                //console.log(user.username);
                if (user == null) {
                    console.log('no such user');
                    done(null, false,req.flash('error','Incorrect user'));
                } else {
                    bcrypt.compare(password, user.password, function(err, isMatch) {
                        if(isMatch){
                            console.log("user: " + user);
                            console.log('correct user');
                            done(null, user);
                        } else {
                            console.log('incorrect password');
                            done(null, false, req.flash('error','Incorrect Password'));
                        }
                    });
                }
            });
        }
    ))
}


