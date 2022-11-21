let inputBar = document.getElementById('inputBar')
let bodyDiv = document.getElementById('body')
	
function searchVideo(){
	const APIkey = 'AIzaSyAolE-78-EjJKQTE_uOs7edcPwJ8yhWHNM'
	let searchKey = inputBar.value
	if (searchKey == "") return
	
	bodyDiv.innerHTML = ""
	
	fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchKey +'&type=video&videoEmbeddable=true&key=' + APIkey)
	.then(data => data.json())
	.then((data) => {
		console.log(data)
		let idConcat = ""
		let videoIDs = []
		
		for (item of data.items){
			videoIDs.push(item.id.videoId)
		}
		
		for (let i = 0; i < videoIDs.length; i++) {
			idConcat += videoIDs[i]
			if (i != videoIDs.length - 1) idConcat += "%2C"
		}
		console.log(idConcat)
		let req = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&id=' + idConcat + '&key=' + APIkey
		console.log(req)
		fetch(req)
		.then( data => data.json())
		.then( (data) => {
			console.log(data)
			bodyDiv.innerHTML += "<div class = \"resultText\">Showing results for " + searchKey + "...</div>"
			for (item of data.items){
				bodyDiv.innerHTML += `<div class = "videoContainer"><img class = "thumbnail center" src = "${item.snippet.thumbnails.high.url}"><br>` +
				`<div class = "centerTextDiv"><div class = "videoTitle">${item.snippet.title}</div><div class = "channelTitle">${item.snippet.channelTitle}</div>` +
				`<hr><div class ="statsContainer"><span class = "statsDigit">${item.statistics.viewCount}</span> &nbspviews  &nbsp&nbsp•&nbsp&nbsp  ` +
				`<span class = "statsDigit">${item.statistics.likeCount}</span> &nbsplikes</div>`
			}
		})
		.catch(error => console.log(error))
	})
	.catch(error => console.log(error))
}