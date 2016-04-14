var config = {};

config.session = {};
config.app = {};
config.db = {};

config.session.secret = 'A B C easy as 1 2 3';
config.app.port = 1234;
config.db.host = 'localhost';
config.db.port = 5678;
config.db.base = 'mellon';

module.exports = config;