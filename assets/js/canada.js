var ctx = document.getElementById('myChart');
var canadaChart = document.getElementById('canada-data');
var provinceChart = document.querySelector('#select-dropdown');
var searchEl =document.querySelector('#save-province');


var getCaData = function(){

    var coviUrl = "https://disease.sh/v3/covid-19/countries/Canada";
    fetch(coviUrl).then(function(response){
        response.json().then(function(data){
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases', 'Recovered', 'Active', 'Serious Critical', 'Total Deaths'],
                    datasets: [{
                        label: 'Covid Data',
                        data:[data.cases, data.recovered, data.active, data.critical, data.deaths],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                
                },

                options: {
                    responsive: true,
                    scales: {

                        y: {
                            beginAtZero: true,
                    }
                }
                    
           }
        });
    
          });
    });

};

function provinceData(province){
    var provinceUrl="https://api.opencovid.ca/timeseries";
    var totalRecovered;
    var totalActiveCases;
    var totalDeaths;
    var totalCases;

    fetch(provinceUrl).then(function(response){
        response.json().then(function(data){

            // Total Recovered
            var a =data.recovered;
            var totalRecovered=0;
            var sumRecovered;
            for(var i =0; i<a.length; i++){
                // console.log(a[i].recovered);
                if (province === a[i].province){
                    totalRecovered = a[i].cumulative_recovered;
                    validation=false;
                    }
                    sumRecovered= sumRecovered+a[i].recovered;
            }
            
            console.log("recovered", totalRecovered);


            // Active Cases
            var b = data.active;
            var totalActiveCases=0;
            for(var i =0; i<b.length; i++){
                if (province === b[i].province){
                    totalActiveCases = b[i].active_cases;
                }
            }
            console.log("active ",totalActiveCases);

            var totalDeath=0;
            var c= data.mortality;
            for(var i =0; i<c.length; i++){
                if (province === c[i].province){
                    totalDeath = c[i].cumulative_deaths;
                    }
            }
            console.log("death" ,totalDeath);


            // Total cases
            var b = data.cases;
            var totalCases=0;
            for(var i =0; i<b.length; i++){
                if (province === b[i].province){
                    totalCases = b[i].cumulative_cases;
                }
            }
            console.log("active ",totalCases);
        });

    });
};

canadaChart.addEventListener("click",getCaData());
searchEl.addEventListener("click", function(e){
    e.preventDefault();
    var x = document.getElementById("select-dropdown").selectedIndex;
    var selectedProvince = document.getElementsByTagName("option")[x].value;

    if(selectedProvince === "British Columbia"){
        selectedProvince = "BC";
    }
    else if(selectedProvince === "Newfoundland and Labrador"){
        selectedProvince = "NL";
    }
    else if(selectedProvince === "Northwest Territories"){
        selectedProvince = "NWT";
    }
    else if(selectedProvince === "Prince Edward Island"){
        selectedProvince = "PEI";
    }

    provinceData(selectedProvince);
});
