var mongoose = require('mongoose');

/**
 * Find all notes for an user
 */
exports.list = function(user, callback) {
  var Note = mongoose.model('Note');
  Note.find({
    'user' : user
  }, function(error, notes) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, notes);
    }
  });
}
/**
 * Find a note by its id & user
 */
exports.get = function(user, id, callback) {
  var Note = mongoose.model('Note');
  Note.find({
    '_id' : id
  }, function(error, notes) {
    if (error) {
      callback(error, null);
    } else if (notes && notes.length == 1) {
      _note = notes[0];
      if (_note.user == user) {
        callback(null, _note);
      } else {
        callback("BAD_USERKEY", null);
      }
    } else {
      callback(null,null);
    }
  });
}

/**
 * Create a note
 */
exports.create = function(user, title, content, callback) {
  var Note = mongoose.model('Note');
  var _note = new Note({
    user: user,
    title: title,
    content: content
  });
  _note.save(callback);
}

/**
 *  Export a note
 */
exports.update = function(user, id, title, content, callback) {
  var Note = mongoose.model('Note');
  Note.find({
    '_id' : id
  }, function(error, notes) {
    if (error) {
      callback(error, null);
    } else if (notes && notes.length == 1) {
      _note = notes[0];
      if (_note.user == user) {
        _note.title = title;
        _note.content = content;
        _note.save(callback);
      } else {
        callback("BAD_USERKEY", null);
      }
    } else {
      callback(null,null);
    }
  });
}

/**
 *  Delete a note
 */ 
exports.delete = function(user, id, callback) {
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
}