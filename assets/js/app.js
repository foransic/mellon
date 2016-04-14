$('document').ready(function() {
  if ($('#notes-list')) {
    getNotes();
  }

  if ($('#login-block')) {
    $('#login-block .form-submit').on('click', function(evt) {
      evt.preventDefault();

      $('#login-block .form-error').hide();

      user = $('#user').val();
      passphrase = $('#passphrase').val();

      valid = false;

      if (user && passphrase) {
        valid = true;
      }

      if (valid) {
        $('#login-block form').submit();
      } else {
        $('#login-block .form-error').show();
      }
    })
  }
});

$(window).on('scroll', function() {
  $('#note').offset({ top: $(window).scrollTop()});
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
      $('#note #note-id').val(data._id);
      $('#note #title').val(data.title);
      $('#note #content').val(data.content);
      $('#note-md-container').html(marked(data.content));
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
      $('#note #note-id').val('');
      $('#note #title').val('');
      $('#note #content').val('');
      $('#note-md-container').html('');
      
      getNotes();
    }
  });   
}).on('mouseover', 'li', function() {
  $(this).find('.remove').show();
}).on('mouseout', 'li', function() {
  $(this).find('.remove').hide();
}).on('click', 'a#new-note', function() {
  $('#note #note-id').val('');
  $('#note #title').val('');
  $('#note #content').val('');
  $('#note-md-container').html('');
  
});

/**
 * Save a note
 */
$('#note input,#note textarea').on('blur', function() {
  method = "PUT";
  noteId = "";
  
  if ($('#note #note-id').val()) {
    noteId = $('#note #note-id').val();
    method = "POST";
  }
  title = $('#note #title').val();
  content = $('#note #content').val();

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
        $('#note #note-id').val(data._id);
        $('#note #title').val(data.title);
        $('#note #content').val(data.content);
        $('#note-md-container').html(marked(data.content));
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