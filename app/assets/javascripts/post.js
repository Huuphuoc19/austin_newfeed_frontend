$(document).ready(function() {
  var keyboard = {
    detectKeyboard: function(event){
      event = (event) ? event : window.event;
      if(event.ctrlKey){
        switch(event.keyCode){
          case 65: return "ctrl+A";
          case 67: return "ctrl+C";
          case 86: return "ctrl+V";
          case 88: return "ctrl+X";
          case 90: return "ctrl+Z";
        }
        return "ctrl";
      } else if(event.shiftKey) {
        switch(event.keyCode){
          case 13: return 'shift+enter'
        }
        return "shift";
      } else if(event.metaKey) {
        return "meta"
      } else {
        switch(event.keyCode){
          case 46: return "delete";
          case 8 : return "backspace";
          case 13: return "enter";
          case 91: return "ctrl";
        }
      }
    }
  };

  // submit by shirt enter
  var newForm = document.getElementById('new_post');
  newForm.addEventListener("keydown", function(event){
    var key = keyboard.detectKeyboard(event);
    var btnSubmit = document.getElementById('new-post-btn');
    if(key == 'shift+enter') {
      $('.emoji-wysiwyg-editor').blur();
      btnSubmit.click();
    }
  });

  // submit edit form by shift enter
  var editForm = document.getElementById('edit_post');
  editForm.addEventListener("keydown", function(e){
    var key = keyboard.detectKeyboard(event);
    if(key == 'shift+enter') {
      $('.emoji-wysiwyg-editor').blur();
      $('#edit-post-btn-submit').click();
    }
  });

  // delete button
  $('#posts-list').on('click','a.dlt-btn',function(e){
    e.preventDefault();
  });

  var modal = $("#modal-edit-post");
  var contentEdit = $("#edit_post ");
  $('#posts-list').on('click', 'a.upt-btn', function(e) {
    modal.modal();
    e.preventDefault();
    var idPost = $(this).attr('data-id');
    var pEl = $("#post-" + idPost + ' .content-p');
    setEditForm('posts/' + idPost, pEl.html());
  });

  // submit edit form
  $('#edit-post-btn').on('click', function(e) {
    $('#edit-post-btn-submit').click();
  });

  function setEditForm(action, content) {
    $('#edit-post-form div.form-control').html(content);
    $("#edit_post").attr('action', action);
  }
});
