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
var displayProvinceData = function(){
    //province wise data
    fetch("https://api.opencovid.ca/timeseries")
        .then( function(response){
            return response.json();
        })
        .then(function(data){
            // give total active recovered and death by province
            // console.log(data);

            var validation=true;
            var userInput = document.getElementById("in").value;
            console.log(userInput);
            var a =data.recovered;
            var totalRecovered=0;
            var sumRecovered;
            for(var i =0; i<a.length; i++){
                // console.log(a[i].recovered);
                if (userInput === a[i].province){
                    totalRecovered = a[i].cumulative_recovered;
                    validation=false;
                    }
                    sumRecovered= sumRecovered+a[i].recovered;
            }
            
            console.log("recovered", totalRecovered);
            if(validation === true){
                alert("You entered wrong province name");
                location.reload(true);
            }

            var b = data.active;
            var totalActiveCases=0;
            for(var i =0; i<b.length; i++){
            if (userInput === b[i].province){
                totalActiveCases = b[i].cumulative_cases;
            }
            }
            console.log("active ",totalActiveCases);

            var totalDeath=0;
            var c= data.mortality;
            for(var i =0; i<c.length; i++){
                if (userInput === c[i].province){
                    totalDeath = c[i].cumulative_deaths;
                    }
            }
            console.log("death" ,totalDeath);

            var totalVaccinated=0;
            
            var d= data.dvaccine;
            for(var i =0; i<d.length; i++){
                if (userInput === d[i].province){
                    totalVaccinated = d[i].cumulative_dvaccine;
                }
            }
            
            console.log("vaccine" ,totalVaccinated);
            document.querySelector("#data").textContent = "vaccine >" + totalVaccinated + " active > " + totalActiveCases + " recovered > " + totalRecovered + " death > " + totalDeath;

        });

}

document.querySelector("button").addEventListener("click",displayProvinceData);