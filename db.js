const mongoose = require('mongoose');
var config = require('./database/mongodb');

mongoose.connect(config.mongo.uri);
mongoose.connect('mongodb://127.0.0.1:27017/GoFood');