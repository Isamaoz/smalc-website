const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var session = require('express-session');
const stud = require('../app/routes/students')
const jwt = require('jwt-simple')
const moment = require('moment');
const flash = require('connect-flash');
const app = express();


router.get('/', async(req,res) => {
	const students = await stud.getAll();
	res.json(students);
});

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

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
module.exports = app;