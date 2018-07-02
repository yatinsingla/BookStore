const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
})

userSchema.methods.checkPassword = function(password){
    return password === this.password;
}

module.exports = mongoose.model('User', userSchema);