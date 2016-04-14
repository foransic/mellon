var mongoose = require('mongoose');  
var config = require('./../config');

var noteSchema = new mongoose.Schema({
  user: String,
  title: String,
  content: String
});

mongoose.model('Note', noteSchema);
mongoose.connect('mongodb://' + config.test.db.host + ':' + config.test.db.port + '/' + config.test.db.base);