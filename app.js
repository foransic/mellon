var express = require('express');
var db = require('./model/db');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var auth = require('./auth');
var note = require('./note');

var app = express();
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'pjxmD8NYYPfOGV673r3l'
}));

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

module.exports = app;

/**
 * Home route
 */
app.route('/')
  .get(function(req, res) {
    if (req.session.user) {
      res.render('notes.ejs');
    } else {
      res.render('login.ejs');
    }
  });
  
/**
 * Login route
 */
app.post('/login', auth.login);
app.get('/logout', auth.logout);

/**
 * Notes routes
 */
app.get('/notes', note.list)
app.get('/note/:id', note.get)
app.post('/note', note.update)
app.put('/note', note.create)
app.delete('/note', note.delete)

app.listen(9002);