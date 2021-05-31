fetch("https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic", {
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-key": "b175906615msh5b051291f1e76e7p18da01jsnbe4860a31294",
		"x-rapidapi-host": "iTunesvolodimir-kudriachenkoV1.p.rapidapi.com"
	},
	"body": {
		"country": "Canada",
		"term": "Shape of you"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});