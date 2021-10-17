const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 3000;
const DB_CONNECTION_STRING = 'mongodb://localhost:27017/cubes';

app.use(express.static(path.resolve(__dirname,'./static')));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.engine('hbs',handlebars({
    extname:'hbs'
}));
app.set('view engine','hbs');
app.set('views', path.resolve(__dirname, './views'));

app.get('/',(req,res)=>{
    res.render('main');
})

mongoose.connect(DB_CONNECTION_STRING)
    .then(app.listen(PORT,() => console.log(`Express running on port: ${PORT}...`)))
    .catch(err=>{
        console.log(err);
    })