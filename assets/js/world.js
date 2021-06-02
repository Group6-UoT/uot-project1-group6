var ctx = document.getElementById('myChart');
var worldChart = document.getElementById('world-data');
var canadaChart = document.getElementById('canada-data');

var getCoviData = function(){

    var coviUrl = "https://disease.sh/v3/covid-19/all";
    fetch(coviUrl).then(function(response){
        response.json().then(function(data){

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases', 'Total Recovered', 'Active Cases', 'Serious Critical', 'Total Deaths'],
                    datasets: [{
                        label: 'Covid Data',
                        data:[data.cases, data.recovered, data.active, data.deaths],
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


worldChart.addEventListener("click",getCoviData());