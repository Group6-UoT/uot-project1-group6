var fun = function(){   
    // news api
    var randomNumberIndex = function(number){
        return Math.floor(Math.random()*(number));
    };

    fetch("https://content.guardianapis.com/search?q=covid&api-key=a0f5a380-0a1a-427b-9d99-14fa9b5750c4&order-by=newest&page-size=200")
    .then( function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data.response.results[0]);
        var len =data.response.results.length;
        var randomNewsIndex = randomNumberIndex(len);
        var result = data.response.results[randomNewsIndex].webTitle;
        if(result.includes("Covid")){
            // news title
            console.log(result);
            // news section
            var section = data.response.results[randomNewsIndex].sectionName;
            console.log(section);
            // news link
            var url = data.response.results[randomNewsIndex].webUrl; 
            console.log(url);

            document.querySelector("#news-title").textContent = "news title > " + result;
            document.querySelector("#news-section").textContent = "news section > " + section;
            document.querySelector("#news-url").innerHTML = url;
            document.querySelector("#news-url").setAttribute("href", url);
        }
        
    });
}
fun();