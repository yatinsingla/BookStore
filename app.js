const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const expressSession = require('express-session');
const validator = require('express-validator');
const flash = require('express-flash');

const bookRouter = require('./src/routes/bookRouter');
const bookModel = require('./src/models/bookModel');
const userModel = require('./src/models/userModel');
const authRouter = require('./src/routes/authRouter');
const contactRouter = require('./src/routes/contactRouter');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
    { link: '/book', title: 'Book'},
    { link: '/author', title: 'Author'},
    { link: '/contact', title: 'Contact Us'}
];

app.use(express.static(path.join(__dirname,'/public')));
app.use('/book/css', express.static(path.join(__dirname,'/public')));
app.use('/book/js', express.static(path.join(__dirname,'/public')));
app.use('/css', express.static(path.join(__dirname,'/node_modules/boostrap/dist/css')));
app.use('/js', express.static(path.join(__dirname,'/node_modules/boostrap/dist/js')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(expressSession({ secret: 'bookstore', resave: true, saveUninitialized: true }));
app.use(validator());
app.use(flash());

require('./src/strategies/passport')(app);

app.use('/book', bookRouter(bookModel, nav));
app.use('/auth', authRouter(userModel, nav));
app.use('/contact', contactRouter(nav));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

app.get('/', function(req, res){
    if (req.isAuthenticated()) {
        res.render('index', {
            nav,
            title: 'BookStore',
            user: req.user
        });
    } else {
        res.redirect('/auth/login');
    }
}).listen(port, function(){
    console.log('You are connected to server on port: ' + port);
});