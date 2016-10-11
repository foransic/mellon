var notesModel = require('./model/notes.js');
var CryptoJS = require("crypto-js");

exports.list = function(req, res) {
  passphrase = req.session.passphrase;

  notesModel.list(function(error, notes) {
    if (error) {
      res.json({error : error});
    } else {
      jsonNotes = [];
      notes.forEach(function(note) {
        jsonNotes.push(getNote(note, passphrase));
      });
      res.json(jsonNotes);
    }
  });
};

exports.get = function(req, res) {
  passphrase = req.session.passphrase;

  id = req.params.id;

  notesModel.get(id, function(error, note) {
    if (error) {
      res.json({error : error});
    } else {
      res.json(getNote(note, passphrase));
    }
  });
};

exports.create = function(req, res) {
  passphrase = req.session.passphrase;

  title = req.body.title;
  content = req.body.content;

  if (title && content) {
    title =  CryptoJS.AES.encrypt(title, passphrase);
    content = CryptoJS.AES.encrypt(content, passphrase);
    notesModel.create(title.toString(), content.toString(), function(error, note) {
      if (error) {
        res.json({error : error});
      } else {
        res.json(getNote(note, passphrase));
      }
    });
  }
};

exports.update = function(req, res) {
  id = req.body._id;
  title = req.body.title;
  content = req.body.content;

  if (id) {
    title =  CryptoJS.AES.encrypt(title, passphrase);
    content = CryptoJS.AES.encrypt(content, passphrase);
    notesModel.update(id, title.toString(), content.toString(), function(error, note) {
      if (error) {
        res.json({error : error});
      } else {
        res.json(getNote(note, passphrase));
      }
    });
  }
};

exports.delete = function(req, res) {
  id = req.body._id;

  if (id) {
    notesModel.delete(id, function(error) {
      if (error) {
        res.json({error : error});
      } else {
        res.json({});
      }
    });
  }
};

getNote = function(note, passphrase) {
  return {
    _id : note._id,
    title : CryptoJS.AES.decrypt(note.title, passphrase).toString(CryptoJS.enc.Utf8),
    content : CryptoJS.AES.decrypt(note.content, passphrase).toString(CryptoJS.enc.Utf8)
  };
};
