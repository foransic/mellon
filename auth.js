var CryptoJS = require("crypto-js");
var config = require('./config');

exports.login = function(req, res) {
  passphrase = req.body.passphrase;
  if (passphrase) {
    req.session.user = CryptoJS.AES.encrypt(config.app.answer, passphrase).toString();
 		req.session.passphrase = CryptoJS.SHA256(passphrase).toString();
	}
  res.redirect('back');
};

exports.logout = function(req, res) {
  req.session = null;
  res.redirect('back');
};
