$(document).ready(function(){
  function getFinalPostId() {
    var lastEl = $("#posts-list li").last();
    return lastEl.attr('data-id');
  }

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  function createElNode(data) {

    var li = document.createElement('li');
    li.setAttribute('data-id', data['id']);
    li.setAttribute('id', 'post#' + data['id']);
    var divEl = document.createElement('div');
    var span1El = document.createElement('span');
    var span2El = document.createElement('span');
    var h4El = document.createElement('h4');
    var pEl = document.createElement('p');

    // create

    var createdAt = new Date(data['created_at']);


    divEl.setAttribute('class', 'date');
    span1El.innerHTML = createdAt.getDate();
    span2El.setAttribute('class', 'small');
    span2El.innerHTML = monthNames[createdAt.getMonth()];
    h4El.innerHTML = data['title'];
    pEl.innerHTML = data['content'];

    // append
    divEl.appendChild(span1El);
    divEl.appendChild(span2El);
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
