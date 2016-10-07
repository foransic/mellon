var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

exports.login = function(req, res) {
  user = req.body.user;
  passphrase = req.body.passphrase;

  if (user && passphrase) {
  	req.session.user = SHA256(user).toString();
 		req.session.passphrase = SHA256(passphrase).toString();
	}
  res.redirect('back');
};

exports.logout = function(req, res) {
  req.session = null;
  res.redirect('back');
};