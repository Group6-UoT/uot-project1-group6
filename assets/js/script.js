// fetch("https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic", {
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/x-www-form-urlencoded",
// 		"x-rapidapi-key": "b175906615msh5b051291f1e76e7p18da01jsnbe4860a31294",
// 		"x-rapidapi-host": "iTunesvolodimir-kudriachenkoV1.p.rapidapi.com"
// 	},
// 	"body": {
// 		"country": "Canada",
// 		"term": "Shape of you"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

var provincialHeadingE1 = document.querySelector("#provincial-heading");
var provinceFormE1 = document.querySelector("#province-form");
var provincialDataE1 = document.querySelector("#provincial-data");
var dataTypeE1 = document.querySelector(".data-type");


provincialHeadingE1.style.display = "none";
provinceFormE1.style.display = "none";

dataTypeE1.addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "LI") {
		console.log(e.target.id + " was clicked");
	
	// provincialHeadingE1.style.display = "block";
	// provinceFormE1.style.display = "block";
}
});