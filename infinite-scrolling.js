(function($) {
var loadingGif = 'https://lh3.googleusercontent.com/-FiCzyOK4Mew/T4aAj2uVJKI/AAAAAAAAPaY/x23tjGIH7ls/s32/ajax-loader.gif';
var olderPostsLink = '';
var loadMoreDiv = null;
var postContainerSelector = 'div.blog-posts';
var loading = false;

var win = $(window);
var doc = $(document);
// Took from jQuery to avoid permission denied error in IE.
var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

function loadMore() {
  if (loading) {
    return;
  }
  loading = true;

  if (!olderPostsLink) {
    loadMoreDiv.hide();
    return;
  }

  loadMoreDiv.find('a').hide();
  loadMoreDiv.find('img').show();
  $.ajax(olderPostsLink, {
    'dataType': 'html'
  }).done(function(html) {
    var newDom = $('<div></div>').append(html.replace(rscript, ''));
    var newLink = newDom.find('a.blog-pager-older-link');
    var media_loaded=function(a){a.className+=" shown",a.classList.remove("blur-up")};deferimg("img.lazyload",80,"lazied",media_loaded); 
    var newPosts = newDom.find(postContainerSelector).children();
    $(postContainerSelector).append(newPosts);

    // Loaded more posts successfully.  Register this pageview with
    // Google Analytics.
    if (window._gaq) {
      window._gaq.push(['_trackPageview', olderPostsLink]);
    }
    // Render +1 buttons.
    if (window.gapi && window.gapi.plusone && window.gapi.plusone.go) {
      window.gapi.plusone.go();
    }
    if (newLink) {
      olderPostsLink = newLink.attr('href');
    } else {
      olderPostsLink = '';
      loadMoreDiv.hide();
    }
    loadMoreDiv.find('img').hide();
    loadMoreDiv.find('a').show();

    loading = false;
  });
}

function getDocumentHeight() {
  return Math.max(
      win.height(),
      doc.height(),
      document.documentElement.clientHeight);
}

function handleScroll() {
  var height = getDocumentHeight();
  var pos = win.scrollTop() + win.height();
  if (height - pos < 150) {
    loadMore();
  }
}

function init() {
  if (_WidgetManager._GetAllData().blog.pageType == 'item') {
    return;
  }

  olderPostsLink = $('a.blog-pager-older-link').attr('href');
  if (!olderPostsLink) {
    return;
  }

  var link = $('<a href="javascript:;">Load more posts</a>');
  link.click(loadMore);
  var img = $('<img src="' + loadingGif + '" style="display: none;">');

  win.scroll(handleScroll);

  loadMoreDiv = $('<div style="text-align: center; font-size: 150%;"></div>');
  loadMoreDiv.append(link);
  loadMoreDiv.append(img);
  loadMoreDiv.insertBefore($('#blog-pager'));
  $('#blog-pager').hide();
}

$(document).ready(init);

})(jQuery);
