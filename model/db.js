var mongoose = require('mongoose');  

var noteSchema = new mongoose.Schema({
  user: String,
  title: String,
  content: String
});

mongoose.model('Note', noteSchema);
mongoose.connect('mongodb://localhost:27017/mellon');