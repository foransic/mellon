var mongoose = require('mongoose');

/**
 * Get the only question
 */
exports.get = function(callback) {
  var Question = mongoose.model('Question');
  Question.find({}, function(error, questions) {
    if (error) {
      callback(error, null);
    } else if (questions && questions.length == 1) {
      _question = questions[0];
      callback(null, _question);
    } else {
      callback(null,null);
    }
  });
};

/**
 * Create the question
 */
exports.create = function(answer, callback) {
  var Question = mongoose.model('Question');
  var _question = new Question({
    answer: answer
  });
  _question.save(callback);
};
