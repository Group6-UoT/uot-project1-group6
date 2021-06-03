var randomNumberIndex = function(number){
    return Math.floor(Math.random()*(number));
};

var displayNews = function(){
    fetch("https://content.guardianapis.com/search?q=covid&api-key=a0f5a380-0a1a-427b-9d99-14fa9b5750c4&order-by=newest&page-size=200")
    .then( function(response){
    return response.json();
    })
    .then(function(data){
        // console.log(data.response.results[0]);
        var fetchedData = data.response.results;
        var randomNewsIndex = randomNumberIndex(fetchedData.length);
        var result = fetchedData[randomNewsIndex].webTitle;
        if(result.includes("Covid")){
            // news section
            var section = fetchedData[randomNewsIndex].sectionName;
            // news link
            var url = fetchedData[randomNewsIndex].webUrl;

            // updated news
            $(".news-title").text(result);
            $(".news-section").text(section);
            $(".news-url").text("Click here to visit source website >>");
            $(".news-url").attr("href", url);
            $(".news-url").attr("target","_blank");
        }
    });
}
displayNews();
$(".next").on("click", displayNews);
setInterval(displayNews, 5000);
