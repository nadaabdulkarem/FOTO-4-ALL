var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logger config 
var logger = require('morgan');
app.use(logger('dev'));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// express session 
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

var customerController = require('./controllers/customerController');
var restaurantController = require('./controllers/restaurantController');
var sessionsController = require('./controllers/sessionsController');
var adminController = require('./controllers/adminController');

app.get('/', (req, res) => {
  res.render('./index');
})

app.use('/customers', customerController);
app.use('/restaurants', restaurantController);
app.use('/login', sessionsController);
app.use('/admin', adminController);


app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
})