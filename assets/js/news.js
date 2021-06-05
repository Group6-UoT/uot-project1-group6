var randomNumberIndex = function(number){
    return Math.floor(Math.random()*(number));
};
var displayedData=[];
var res;
var sec;
var urlP;

var getdata = function(){
    console.log(displayedData);
    if(displayedData.length===1){
        location.reload(true);
    }
    console.log(displayedData);
    displayedData.pop();
    res=displayedData[displayedData.length-1].result;
    sec = displayedData[displayedData.length-1].section;
    urlP = displayedData[displayedData.length-1].url;
};

var updateNewscontent = function(result, section, url){
    if(displayedData.length<=0){
        return;
    }
    // updated news
    $(".news-title").text(result);
    $(".news-section").text(section);
    $(".news-url").text("Click here to visit source website >>");
    $(".news-url").attr("href", url);
    $(".news-url").attr("target","_blank");
}

var displayNews = function(){
    fetch("https://content.guardianapis.com/search?q=covid&api-key=a0f5a380-0a1a-427b-9d99-14fa9b5750c4&order-by=newest&page-size=200")
    .then( function(response){
    return response.json();
    })
    .then(function(data){
        if(displayedData===""){
            location.reload(true);
        }
        var fetchedData = data.response.results;
        var randomNewsIndex = randomNumberIndex(fetchedData.length);
        var result = fetchedData[randomNewsIndex].webTitle;
        if(result.indexOf("Covid") !== -1){
            // news section
            var section = fetchedData[randomNewsIndex].sectionName;
            // news link
            var url = fetchedData[randomNewsIndex].webUrl;
            
            var dataobj = {
                "result" : result,
                "section" : section,
                "url" : url
            }
            displayedData.push(dataobj);
            updateNewscontent(result, section, url);            
        }
        else{
            displayNews();
        }
    }).catch((error) => {
        console.error(error);
      });
}

displayNews();

$(".next").click(displayNews);
$(".previous").click(function(){
    getdata();
    updateNewscontent(res, sec, urlP);
});