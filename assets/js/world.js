var ctx = document.getElementById('myChart');
var worldChart = document.getElementById('world-data');
var canadaChart = document.getElementById('canada-data');

//Function fetches COVID world data and displays it in a bar chart
var getCoviData = function(){

    var coviUrl = "https://disease.sh/v3/covid-19/all";
    fetch(coviUrl).then(function(response){
        response.json().then(function(data){

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases: '+ data.cases, 'Total Recovered: '+data.active, 'Active Cases: '+data.cases, 'Serious Critical: '+data.critical, 'Total Deaths: '+data.deaths],
                    datasets: [{
                        labels:{display:false},
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


worldChart.addEventListener("click",getCoviData());