var config = {};

config.session = {};
config.app = {};
config.db = {};

config.session.secret = 'A B C easy as 1 2 3'; // please change it to something safer ;-)
config.app.port = 1234;
config.app.answer = '42'; // please change it to something safer ;-)
config.db.host = 'localhost';
config.db.port = 5678;
config.db.base = 'mellon';


module.exports = config;
