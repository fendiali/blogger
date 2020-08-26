function fenTags() {
	// Selecting the input element and get its value 
	var url = document.getElementById("tags").value;
	//clean url

	var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
	if (videoid != null) {
		var vid = videoid[1];
		$.getJSON('https://www.googleapis.com/youtube/v3/videos?alt=json&part=snippet&id=' + vid + '&type=videos&key=AIzaSyA-dlBUjVQeuc4a6ZN4RkNUYDFddrVLxrA', function (data) {

			html = '';

			var cenel = "<a class='fen-suggest-btn' href='https://www.fendiali.net/p/yt-tags-extractor.html'>Find again</a><b>Channel:</b> " + data.items[0].snippet.channelTitle + "<br/><b>Title:</b> " + data.items[0].snippet.title;

			$(".channel").append(cenel);
			
			html += "<h2>Tags</h2> <ul>";

			$.each(data.items[0].snippet.tags, function (index, fenItems) {
				html += fenItems + ", ";

			});
			html += "</ul>";
			
			$("#fen-results-msg").append(html);
		
			document.getElementById('form-tags').innerHTML = "";
			
		});
	} else {
		console.log("The youtube url is not valid.");
	}

}
