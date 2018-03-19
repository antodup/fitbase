/*============================================================
#title            : Health.js
#description      : Script for health page
#author           : DUPRE ANTHONY
#date             : 2018/03/17
#version          : Constantly on progress
#usage            : JAVASCRIPT
#notes            : 
=============================================================*/

/*----------CHART SOMMEIL----------*/
var sleepChart = document.getElementById("chart-sleep");
//GRADIENT
var contextSleep = sleepChart.getContext('2d');
var gradientSleep = contextSleep.createLinearGradient(0, 0, 200, 0);
gradientSleep.addColorStop(0, '#F4E932');//JAUNE
gradientSleep.addColorStop(0.50, '#96C84E');//VERT
gradientSleep.addColorStop(1, '#219CC5');//BLEU
//CHARTS
var myChart = new Chart(sleepChart, {
    type: 'bar',
    data: {
        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        datasets: [{
            label: 'Temps de sommeil ',
            data: [5, 7, 8, 4, 9, 10, 7],
            fill: false,
            borderColor: gradientSleep,
            backgroundColor: gradientSleep,
            lineTension: 0.2,
            borderWidth: 3
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Sommeil',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#242428"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544"
        },
        legends: {
            display: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

/*----------CHART WATER----------*/
//GRADIENT

//DATA WATER
var Water = [1500];
//CHARTS
var myDoughnutChart = {
    type: 'doughnut',
    data: {
        datasets: [{
            label: 'Eau bu',
            data: Water,
            fill: false,
            backgroundColor: [
                '#e6e1e7',
                '#96C84E',
                '#219CC5',
                '#F4E932',
                '#96C84E',
                '#219CC5'
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Eau",
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#242428"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544"
        },
        legends: {
            display: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
    }
};

window.onload = function () {
    var waterChart = document.getElementById("chart-water").getContext('2d');
    window.myDoughnut = new Chart(waterChart, myDoughnutChart);
};
var inputWater = document.querySelector("#number-water").value,
    userWater = null;

document.querySelector("#number-water").addEventListener("click", function () {
    inputWater = inputWater++ + 1;
    userWater = inputWater;
    console.log(userWater)
})

document.querySelector("#save-water").addEventListener("click", function () {
    if (myDoughnutChart.data.datasets.length > 0) {
        var userWaterML = userWater * 250;
        var newAllwater = Water[0] - userWaterML;
        Water[0] = newAllwater;
        Water.push(userWaterML);
        window.myDoughnut.update()
        if (Water[0] <= 0) {
            Water.shift()
            window.myDoughnut.update()
           // myDoughnutChart.data.datasets[0].backgroundColor[0] = "#0062cc";
            $("#result-water").css("color", "#219CC5")
            $("#result-water").css("font-weight", "bold")
        }
        for (var i = 1; i < Water.length; i++) {
            $("#result-water").html(userWaterML + Water[i++]);
        }
    }
})
/*----------CHART CARDIAC----------*/
var cardiacChart = document.getElementById("chart-cardiac");
//GRADIENT
var contextCardiac= cardiacChart.getContext('2d');
var gradientCardiac = contextCardiac.createLinearGradient(0, 0, 200, 0);
gradientCardiac.addColorStop(0, '#F4E932');//JAUNE
gradientCardiac.addColorStop(0.50, '#96C84E');//VERT
gradientCardiac.addColorStop(1, '#219CC5');//BLEU
//CHARTS
var myChart = new Chart(cardiacChart, {
    type: 'line',
    data: {
        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        datasets: [{
            label: 'Pulsation Cardiac ',
            data: [80, 60, 64, 95, 74, 68, 70],
            fill: false,
            borderColor: gradientCardiac,
            backgroundColor: gradientCardiac,
            lineTension: 0.2,
            borderWidth: 3
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Fréquence Cardiac',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#242428"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544"
        },
        legends: {
            display: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})

/*----------CHART WEIGHT----------*/
var weightChart = document.getElementById("chart-weight");
//GRADIENT
var contextWeight= weightChart.getContext('2d');
var gradientWeight = contextWeight.createLinearGradient(0, 0, 200, 0);
gradientWeight.addColorStop(0, '#F4E932');//JAUNE
gradientWeight.addColorStop(0.50, '#96C84E');//VERT
gradientWeight.addColorStop(1, '#219CC5');//BLEU
//CHARTS
var myChart = new Chart(weightChart, {
    type: 'line',
    data: {
        labels: ["Janvier", "Février", "Mars"],
        datasets: [{
            label: 'Pulsation Cardiac',
            data: [80, 60, 64],
            borderColor: gradientWeight,
            backgroundColor: '#219cc559',
            lineTension: 0.2,
            borderWidth: 3,
            fill: true
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Poid',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#242428"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544"
        },
        legends: {
            display: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})
