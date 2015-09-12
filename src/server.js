require('dotenv').load();
var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

// initialize middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// initialize and set up routers
var authRouter = express.Router();
var userRouter = express.Router();
require('./auth/authRouter')(authRouter);
require('./user/userRouter')(userRouter);

app.use('/', express.static(__dirname + '/client'));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// start server
var server = app.listen(process.env.PORT, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
