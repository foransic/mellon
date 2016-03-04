var mongoose = require('mongoose');  
var config = require('./../config');

var noteSchema = new mongoose.Schema({
  user: String,
  title: String,
  content: String
});

mongoose.model('Note', noteSchema);
mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.base);