var ctx = document.getElementById('myChart');
//var worldChart = document.getElementById('world-data');
var canadaChart = document.getElementById('canada-data');


var getCaData = function(country){

    //var coviUrl = "https://disease.sh/v3/covid-19/countries/" + country;
    //var coviUrl = "https://disease.sh/v3/covid-19/all";
    var coviUrl = "https://disease.sh/v3/covid-19/countries/Canada";
    fetch(coviUrl).then(function(response){
        response.json().then(function(data){
            // casesEl = data.cases;
            // console.log(casesEl,data.country);
             console.log(data.active,data.country);

            // var a=[];
            // var c=[];
            // var b=[];
            // console.log(data);
            // for(var i=0 ; i<data.length; i++){
            //     a.push(data[i].cases);
            //     c.push(data[i].country);

            // }

            //map(a,c);

            
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Cases', 'Recovered', 'Active', 'Deaths'],
                    datasets: [{
                        label: 'Covid Data',
                        //data: [data[i].cases, data[i].active, data[i].recovered, data[i+1].cases, 2, 3],
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


canadaChart.addEventListener("click",getCaData());