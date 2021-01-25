import createError = require('http-errors');
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

import {indexRouter} from './routes/index';
import {usersRouter} from './routes/users';
import {expenseRouter} from './routes/expense';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expense', expenseRouter);

// catch 404 and forward to error handler
app.use((req:express.Request, res:express.Response, next:express.NextFunction)=>
  {next(createError(404));}
);

// error handler
app.use((err:any, req:express.Request, res:express.Response, next:express.NextFunction)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001);

module.exports = app;
