var ctx = document.getElementById('myChart');
var canadaChart = document.getElementById('canada-data');


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

var userInput;
var displayProvinceData = function(){
    userInput = $('#select-dropdown').find(":selected").val();
    fetch("https://api.opencovid.ca/timeseries")
        .then( function(response){
            return response.json();
        })
        .then(function(data){
            // give total active recovered and death by province
            var validation=true;
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
        document.querySelector("button").addEventListener("click",displayProvinceData);



    };



$("#save-province").on("click", displayProvinceData);
canadaChart.addEventListener("click",getCaData());