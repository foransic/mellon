var mongoose = require('mongoose');
var config = require('./../config');

var noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

var questionSchema = new mongoose.Schema({
  answer: String
});

mongoose.model('Note', noteSchema);
mongoose.model('Question', questionSchema);
mongoose.connect('mongodb://' + config.test.db.host + ':' + config.test.db.port + '/' + config.test.db.base);
