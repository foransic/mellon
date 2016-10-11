var CryptoJS = require("crypto-js");
var questionsModel = require('./model/questions.js');
var config = require('./config');

exports.login = function(req, res) {
  passphrase = req.body.passphrase;
  questionsModel.get(function(error, question) {
    access = false;
    if (question) {
      // a question exist, let's check if we have the answer
      answer = CryptoJS.AES.decrypt(question.answer, passphrase).toString(CryptoJS.enc.Utf8);
      access = (answer == config.app.answer);
    } else {
      // first use, we create the question
      answer = CryptoJS.AES.encrypt(config.app.answer, passphrase);
      questionsModel.create(answer.toString(), function(error, question) {
        access = question ? true : false;
      });
    }

    if (access) {
      req.session.passphrase = CryptoJS.SHA256(passphrase).toString();
    }
    res.redirect('back');
  });
};

exports.logout = function(req, res) {
  req.session = null;
  res.redirect('back');
};
