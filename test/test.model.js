var config = require('../config');
var mongoose = require('mongoose');
// DB conf specific for the tests
var db = require('./db');
var notesModel = require('../model/notes.js');

var chai = require('chai');
chai.should();

describe('Notes', function() {
	var notesId = Array();

	// before hook create data test
	before(function(done) {
     createNoteCb = function(error, note) {
      if (error) throw error;
      notesId.push(note._id);
    };

		for (i = 1; i <= 3; i++) {
			notesModel.create('test', 'test' + i + '_title', 'test' + i + '_content', createNoteCb);
		}
		done();
	});
  
	// list notes test case
	describe('#list()', function() {
		it('list all notes for matching user', function(done) {
			notesModel.list('test', function(error, notes) {
				if (error) return done(error);
				notes.should.have.length(3);
				done();
			});
		});		
	});

	// get note test case
	describe('#get()', function() {
		it('Get note for matching user and id', function(done) {
			notesModel.get('test', notesId[0], function(error, note) {
				if (error) return done(error);
				note.user.should.equal('test');
				note.title.should.equal('test1_title');
				note.content.should.equal('test1_content');
				done();
			});
		});		
	});

	// create note test case
	describe('#create()', function() {
		it('create a note for matching user', function(done) {
			notesModel.create('test', 'test4_title', 'test4_content', function(error, note) {
				if (error) return done(error);
				note.user.should.equal('test');
				note.title.should.equal('test4_title');
				note.content.should.equal('test4_content');
				notesId.push(note._id);
				done();
			});
		});		
	});

	// update note test case
	describe('#update()', function() {
		it('update a note for matching user', function(done) {
			notesModel.update('test', notesId[1], 'test2_title_modified', 'test2_content_modified', function(error, note) {
				if (error) throw error;
				note.user.should.equal('test');
				note.title.should.equal('test2_title_modified');
				note.content.should.equal('test2_content_modified');
				done();
			});
		});		
	});

	// delete note test case
	describe('#delete()', function() {
		it('delete a note for matching user', function(done) {
			notesModel.delete('test', notesId[2], function(error, note) {
				if (error) throw error;
				done();
			});
		});		
	});

	// after hook delete data test
	after(function(done) {
    mongoose.model('Note').remove({}, function() {      
      done();    
    });  
	});
});