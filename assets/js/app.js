$('document').ready(function() {
  if ($('#notes-list')) {
    getNotes();
  }

  if ($('#login-block')) {
    $('#login-block .form-submit').on('click', function(evt) {
      evt.preventDefault();

      $('#login-block .form-error').hide();
      passphrase = $('#passphrase').val();

      if (passphrase) {
        $('#login-block form').submit();
      } else {
        $('#login-block .form-error').show();
      }
    })
  }
});

/**
 * Notes list interaction
 */
$('#notes-list').on('click', 'li>a', function() {
  noteId = $(this).parent().attr('id').split('-')[1];
  $.get('note/' + noteId, function(data) {
    if (data.error) {
      console.log('error : ' + error);
    } else {
      // update editable field
      $('#note-container #note-id').val(data._id);
      $('#note-container #title').val(data.title);
      $('#note-container #content').val(data.content);

      // update preview field
      $('#note-preview-container h1').html(data.title);
      $('#note-preview-container p').html(marked(data.content));
      $('#note-container').hide();
      $('#note-preview-container').show();
    }
  });
}).on('click', 'li>span.remove', function() {
  noteId = $(this).parent().attr('id').split('-')[1];
  $.ajax('note', {
    method : 'DELETE',
    data: {
      '_id' : noteId
  }}).done(function(data) {
    if (data.error) {
      console.log('error : ' + error);
    } else {
      // update editable field
      $('#note-container #note-id').val('');
      $('#note-container #title').val('');
      $('#note-container #content').val('');

      // update preview field
      $('#note-preview-container h1').html('');
      $('#note-preview-container p').html('');
      $('#note-container').show();
      $('#note-preview-container').hide();
      getNotes();
    }
  });
}).on('mouseover', 'li', function() {
  $(this).find('.remove').show();
}).on('mouseout', 'li', function() {
  $(this).find('.remove').hide();
}).on('click', 'a#new-note', function() {
  // update editable field
  $('#note-container #note-id').val('');
  $('#note-container #title').val('');
  $('#note-container #content').val('');

  // update preview field
  $('#note-preview-container h1').html('');
  $('#note-preview-container p').html('');
  $('#note-container').show();
  $('#note-preview-container').hide();
});

/**
 * Switch from preview to edit
 **/
$('#note-preview-container').on('click', function() {
  $('#note-preview-container').hide();
  $('#note-container').show();
  $('#note-container #content').focus();
});

/**
 * Save a note
 */
$('#note-form').on('submit', function(event) {
  event.preventDefault();
  method = "PUT";
  noteId = "";

  if ($('#note-container #note-id').val()) {
    noteId = $('#note-container #note-id').val();
    method = "POST";
  }
  title = $('#note-container #title').val();
  content = $('#note-container #content').val();

  if (title && content) {
    $.ajax('note', {
      method : method,
      data: {
        '_id' : noteId,
        'title': title,
        'content': content
    }}).done(function(data) {
      if (data.error) {
        console.log('error : ' + error);
      } else {
        // update editable field
        $('#note-container #note-id').val(data._id);
        $('#note-container #title').val(data.title);
        $('#note-container #content').val(data.content);

        // update preview field
        $('#note-preview-container h1').html(data.title);
        $('#note-preview-container p').html(marked(data.content));
        $('#note-preview-container').show();
        $('#note-container').hide();
        getNotes();
      }
    });
  }
});

/**
 * Get all user notes
 */
getNotes = function() {
  $.get('notes', function(data) {
    if (data.error) {
      console.log('error : ' + error);
    } else if (data.length > 0) {
      $('#notes-list ul').html('');
      $.each(data, function(idx, note) {
        subContent = note.content.substring(0, 40);
        $('#notes-list ul').append('<li id="note-' + note._id + '"><span class="pull-right remove glyphicon glyphicon-remove-circle"></span><a href="#">' + note.title + '</a><br /><span class="preview">' + subContent + '</span></li>');
      });
    }
  });
}
