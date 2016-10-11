var mongoose = require('mongoose');

/**
 * Find all notes
 */
exports.list = function(callback) {
  var Note = mongoose.model('Note');
  Note.find({}, function(error, notes) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, notes);
    }
  });
};

/**
 * Find a note by its id
 */
exports.get = function(id, callback) {
  var Note = mongoose.model('Note');
  Note.find({
    '_id' : id
  }, function(error, notes) {
    if (error) {
      callback(error, null);
    } else if (notes && notes.length == 1) {
      _note = notes[0];
      callback(null, _note);
    } else {
      callback(null,null);
    }
  });
};

/**
 * Create a note
 */
exports.create = function(title, content, callback) {
  var Note = mongoose.model('Note');
  var _note = new Note({
    title: title,
    content: content
  });
  _note.save(callback);
};

/**
 *  Export a note
 */
exports.update = function(id, title, content, callback) {
  var Note = mongoose.model('Note');
  Note.find({
    '_id' : id
  }, function(error, notes) {
    if (error) {
      callback(error, null);
    } else if (notes && notes.length == 1) {
      _note = notes[0];
      _note.title = title;
      _note.content = content;
      _note.save(callback);
    } else {
      callback(null,null);
    }
  });
};

/**
 *  Delete a note
 */
exports.delete = function(id, callback) {
  var Note = mongoose.model('Note');
  Note.remove({
    '_id' : id
  }, function(error) {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
};
