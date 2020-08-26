function fenTags() {
	// Selecting the input element and get its value 
	var url = document.getElementById("tags").value;
	//clean url

	var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
	if (videoid != null) {
		var vid = videoid[1];
		$.getJSON('https://www.googleapis.com/youtube/v3/videos?alt=json&part=snippet&id=' + vid + '&type=videos&key=AIzaSyA-dlBUjVQeuc4a6ZN4RkNUYDFddrVLxrA', function (data) {

			html = '';

			var cenel = "<b>Channel:</b> " + data.items[0].snippet.channelTitle + "<br/><b>Title:</b> " + data.items[0].snippet.title;

			$(".channel").append(cenel);
			
			var msg = "<h2>YouTube Tags</h2>";
			$("#fen-results-msg").append(msg);

			$.each(data.items[0].snippet.tags, function (index, fenItems) {
				html += fenItems + ", ";

			});
			
			$("#fen-results-tags").append(html);
			var rld ="<a href='https://www.fendiali.net/p/yt-tags-extractor.html' style='font-size:18px;font-weight:bold'>Reload this page to extract tags again!</a>";
		
			document.getElementById('form-tags').innerHTML = "";
			
		});
	} else {
		console.log("The youtube url is not valid.");
	}

}
