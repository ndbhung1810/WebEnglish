const express = require('express');
const path = require('path');
var cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index'); 
const app = express();

global.__basedir = __dirname;
global.__idcreated = -1;
global.__roleId = -1;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api', indexRouter); 

module.exports = app;
