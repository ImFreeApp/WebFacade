require('dotenv').load();
var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');

// initialize middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// initialize routers and set up routes
var authRouter = express.Router();
var userRouter = express.Router();
require('./auth/authRouter')(authRouter);
require('./user/userRouter')(userRouter);

app.use('/', express.static(path.join(__dirname, '../client/build/')));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// start server
var server = app.listen(process.env.PORT, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
