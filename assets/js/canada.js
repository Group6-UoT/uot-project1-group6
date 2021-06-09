var ctx = document.getElementById('myChart');
var canadaChart = document.getElementById('canada-data');
var provinceChart = document.querySelector('#select-dropdown');
var searchEl =document.querySelector('#save-province');

//Function fetches COVID Canada wide data and displays it in a bar chart
var getCaData = function(){

    var coviUrl = "https://disease.sh/v3/covid-19/countries/Canada";
    fetch(coviUrl).then(function(response){
        response.json().then(function(data){
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases: '+ data.cases, 'Total Recovered: '+data.active, 'Active Cases: '+data.cases, 'Serious Critical: '+data.critical, 'Total Deaths: '+data.deaths],
                    datasets: [{
                        label:null,
                        data:[data.cases, data.recovered, data.active, data.critical, data.deaths],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
                    plugins:{
                        title:{
                            display:true,
                            text:"COVID-19 Data"
                        },
                        legend:{
                            display:false
                        }
                    },
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

//Function fetches province data based on the province the user selects and displays it in a bar chart
function provinceData(province){
    var provinceUrl="https://api.opencovid.ca/timeseries";
    var totalRecovered;
    var totalActiveCases;
    var totalDeath;
    var totalCases;

    fetch(provinceUrl).then(function(response){
        response.json().then(function(data){

            // Total Recovered
            var a =data.recovered;
            totalRecovered=0;
            var sumRecovered;
            for(var i =0; i<a.length; i++){
                if (province === a[i].province){
                    totalRecovered = a[i].cumulative_recovered;
                    validation=false;
                    }
                    sumRecovered= sumRecovered+a[i].recovered;
            }
            // Active Cases
            var b = data.active;
            totalActiveCases=0;
            for(var i =0; i<b.length; i++){
                if (province === b[i].province){
                    totalActiveCases = b[i].active_cases;
                }
            }

            totalDeath=0;
            var c= data.mortality;
            for(var i =0; i<c.length; i++){
                if (province === c[i].province){
                    totalDeath = c[i].cumulative_deaths;
                    }
            }


            // Total cases
            var b = data.cases;
            totalCases=0;
            for(var i =0; i<b.length; i++){
                if (province === b[i].province){
                    totalCases = b[i].cumulative_cases;
                }
            }

            myChart.destroy();
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases: '+totalCases, 'Recovered: '+totalRecovered, 'Active: '+totalActiveCases, 'Total Deaths: '+totalDeath],
                    datasets: [{
                        label:null,
                        data:[totalCases, totalRecovered, totalActiveCases, totalDeath],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
                    plugins:{
                    title:{
                        display:true,
                        text:"COVID-19 Data > " + province
                    },
                    legend:{
                        display:false
                    }
                },
                    responsive: true,
                    scales: {
        
                        y: {
                            beginAtZero: true,
                    },
                }
                    
           }
        });
        });

    });




};

function destroyChart(myChart){
    myChart.destroy(ctx);
}

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
