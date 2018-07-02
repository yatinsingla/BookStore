const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const expressSession = require('express-session');

const bookRouter = require('./src/routes/bookRouter');
const bookModel = require('./src/models/bookModel');
const userModel = require('./src/models/userModel');
const authRouter = require('./src/routes/authRouter');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
    { link: '/book', title: 'Book'},
    { link: '/author', title: 'Author'},
    { link: '/auth/login', title: 'SignIn'},
    { link: '/auth/logout', title: 'Logout'}
];



app.use(express.static(path.join(__dirname,'/public')));
app.use('/book/css', express.static(path.join(__dirname,'/public')));
app.use('/book/js', express.static(path.join(__dirname,'/public')));
app.use('/css', express.static(path.join(__dirname,'/node_modules/boostrap/dist/css')));
app.use('/js', express.static(path.join(__dirname,'/node_modules/boostrap/dist/js')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(expressSession({ secret: 'bookstore', resave: false, saveUninitialized: true }));

require('./src/strategies/passport')(app);

app.use('/book', bookRouter(bookModel, nav));
app.use('/auth', authRouter(userModel, nav));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {
        nav,
        title: 'BookStore' 
    });
}).listen(port, function(){
    console.log('You are connected to server on port: ' + port);
});