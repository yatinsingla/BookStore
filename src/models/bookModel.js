const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title : {type:String},
    author : {type:String},
    genre : {type:String},
    read : {type:Boolean}
})

module.exports = mongoose.model('Book', bookSchema);