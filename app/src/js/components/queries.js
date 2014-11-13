var ref = new Firebase("https://hndb.firebaseio.com/");

$('#submit').on('click', function (e) {
  var filter = $('#dropdown').children(":selected").attr("id");
  if (filter === 'title') {
    $('#search').css({'display': 'inline', 'visibility':'visible'});
  } else {
    ref.orderByChild(filter).limitToLast(10).on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var story = child.val();
        $('<div class="story"><a href="' + story.url + '">' + story.title + '</a> ' + story.score + ' points by <a href="https://news.ycombinator.com/user?id=' + story.by + '">' + story.by + '</a> (<a href="https://news.ycombinator.com/item?id=' + story.id + '">' + story.numComments + ' comments</a>)</div>').appendTo($('#stories'));
      });
    });
  }
});

$('#search').on('keypress', function (e) {
  if (e.keyCode === 13) {
    var query = $('#search').val();
    ref.orderByChild('title').startAt(query).endAt(query + '~').on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var story = child.val();
        $('<div class="story"><a href="' + story.url + '">' + story.title + '</a> ' + story.score + ' points by <a href="https://news.ycombinator.com/user?id=' + story.by + '">' + story.by + '</a> (<a href="https://news.ycombinator.com/item?id=' + story.id + '">' + story.numComments + ' comments</a>)</div>').appendTo($('#stories'));
      });
    });
  }
});