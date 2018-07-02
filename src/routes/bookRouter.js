const express = require('express');
const mongoose = require('mongoose');
const bookService = require('../services/goodreadServices');

const bookRouter = express.Router();
const db = mongoose.connect('mongodb://localhost/bookAPI');

const router = function(bookModel, nav){

    bookRouter.route('/')
    .get((req, res)=>{
        console.log(req.user);
        if(req.user) {
            bookModel.find(function(err, book){
                res.render('books', {
                    nav,
                    title: 'Books',
                    book
                })
            })   
        } else {
            res.redirect('/auth/login');
        }
        
    });

    bookRouter.route('/:id')
    .get((req, res)=>{
        bookModel.findById(req.params.id, function(err, book){
            (async function getById(){
                book.details = await bookService.getBookById(book.bookId);
                //console.log(book.details);
                res.render('bookById', {
                    nav,
                    title: 'Books',
                    book
                });
            }())
        });
    });

    return bookRouter;
}

module.exports = router;