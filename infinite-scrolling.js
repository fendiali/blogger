!function(e){var i="https://lh3.googleusercontent.com/-FiCzyOK4Mew/T4aAj2uVJKI/AAAAAAAAPaY/x23tjGIH7ls/s32/ajax-loader.gif",a="",n=null,o="div.blog-posts",t=!1,d=e(window),l=e(document),r=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;function g(){t||(t=!0,a?(n.find("a").hide(),n.find("img").show(),e.ajax(a,{dataType:"html"}).done(function(i){var d=e("<div></div>").append(i.replace(r,"")),l=d.find("a.blog-pager-older-link");deferimg("img.lazyload",80,"lazied",function(e){e.className+=" shown",e.classList.remove("blur-up")});var g=d.find(o).children();e(o).append(g),window._gaq&&window._gaq.push(["_trackPageview",a]),window.gapi&&window.gapi.plusone&&window.gapi.plusone.go&&window.gapi.plusone.go(),l?a=l.attr("href"):(a="",n.hide()),n.find("img").hide(),n.find("a").show(),t=!1})):n.hide())}function p(){Math.max(d.height(),l.height(),document.documentElement.clientHeight)-(d.scrollTop()+d.height())<150&&g()}e(document).ready(function(){if("item"!=_WidgetManager._GetAllData().blog.pageType&&(a=e("a.blog-pager-older-link").attr("href"))){var o=e('<a href="javascript:;">Load more posts</a>');o.click(g);var t=e('<img src="'+i+'" style="display: none;">');d.scroll(p),(n=e('<div style="text-align: center; font-size: 16px;"></div>')).append(o),n.append(t),n.insertBefore(e("#blog-pager")),e("#blog-pager").hide()}})}(jQuery);
