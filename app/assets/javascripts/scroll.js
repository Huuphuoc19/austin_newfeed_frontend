$(document).ready(function(){
  function getFinalPostId() {
    var lastEl = $("#posts-list li.main-post").last();
    return lastEl.attr('data-id');
  }

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  function createElNode(data) {

    var li = document.createElement('li');
    li.setAttribute('class','main-post');
    li.setAttribute('data-id', data['id']);
    li.setAttribute('id', 'post-' + data['id']);
    var divEl = document.createElement('div');
    var hoverEL = document.createElement('div');
    var ulEl = document.createElement('ul');
    var liUpdate = document.createElement('li');
    var liDelete = document.createElement('li');
    var aUpdate = document.createElement('a');
    var aDelete = document.createElement('a');
    var span1El = document.createElement('span');
    var span2El = document.createElement('span');
    var h4El = document.createElement('h4');
    var pEl = document.createElement('p');

    // create

    var createdAt = new Date(data['created_at']);

    hoverEL.setAttribute('class', 'hover-opt');
    // update
    aUpdate.setAttribute('class', 'upt-btn');
    aUpdate.setAttribute('data-id', data['id']);
    aUpdate.setAttribute('href', '#');
    aUpdate.innerHTML = '<i class="fa fa-pencil-square-o"></i>';

    // delete
    aDelete.setAttribute('class', 'dlt-btn');
    aDelete.setAttribute('data-id', data['id']);
    aDelete.setAttribute('data-confirm', 'This post will be deleted permamently');
    aDelete.setAttribute('data-remote', 'true');
    aDelete.setAttribute('rel', 'nofollow');
    aDelete.setAttribute('data-method', 'delete');
    aDelete.setAttribute('href', '/posts/' + data['id']);
    aDelete.innerHTML = '<i class="fa fa-trash-o"></i>';

    liDelete.appendChild(aDelete);
    liUpdate.appendChild(aUpdate);
    ulEl.appendChild(liUpdate);
    ulEl.appendChild(liDelete);
    hoverEL.appendChild(ulEl);

    divEl.setAttribute('class', 'date');
    span1El.innerHTML = createdAt.getDate();
    span2El.setAttribute('class', 'small');
    span2El.innerHTML = monthNames[createdAt.getMonth()];
    h4El.innerHTML = data['title'];
    pEl.setAttribute('class', 'content-p');
    pEl.innerHTML = data['content'];

    // append
    divEl.appendChild(span1El);
    divEl.appendChild(span2El);
    li.appendChild(hoverEL);
    li.appendChild(divEl);
    li.appendChild(h4El);
    li.appendChild(pEl);

    return li;
  }

  function appendContentToList(parent, data) {
    var length = data.length;
    for(var i = 0 ; i < length ; i ++) {
      var li = createElNode(data[i]);
      parent.appendChild(li);
    }
  }


  function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  };

  function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  var postList = document.getElementById('posts-list');
  $("#test_ajax").click(function(e){
    $.ajax({
      url: "/posts/more",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id: getFinalPostId() }),
    })
    .done(function(data) {
      if(data.length > 0) {
        appendContentToList(postList, data);
      }
    });
  });

  window.onscroll = function() {
    if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
      $.ajax({
        url: "/posts/more",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: getFinalPostId() }),
      })
      .done(function(data) {
        if(data.length > 0) {
          appendContentToList(postList, data);
        }
      });
    }
  }
});
