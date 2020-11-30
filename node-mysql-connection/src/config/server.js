const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));
// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../static')))
app.use(express.static(__dirname + '/src/app/views'));
app.use('/css', express.static(__dirname + '/../public/css'))
app.use('/img', express.static(__dirname + '/../public/img'))
app.use('/js', express.static(__dirname + '/../public/js'))

// app.get('/add-students', (req,res) => {
//   res.render('add-students', { text: 'Holiiii'})
// })

module.exports = app;
