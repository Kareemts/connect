var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const config = require('./config/database');
const mongoose = require('mongoose');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/user');

var app = express();
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

const connection = mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
if (connection) {
  console.log('database connected');
} else {
  console.log('database connection error');
}

app.use('/admin', adminRouter);
app.use('/', usersRouter);

// for deployment

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../react/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react', 'build', 'index.html'));
  });
}

// for deployment

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
