/*============================================================
#title            : Health.js
#description      : Script for health page
#author           : DUPRE ANTHONY
#date             : 2018/03/17
#version          : Constantly on progress
#usage            : JAVASCRIPT
#notes            : 
=============================================================*/

if (document.documentElement.clientWidth <= 768) {
    $(".modif-ctn-boostrap").prepend("<img src='/img/logo.svg' alt='logo Fitbase' class='logo-res'>");
    window.addEventListener('deviceorientation', function (evenement) {
        //PODOMETRES
        if (Math.round(evenement.beta) < 0 || Math.round(evenement.beta) > -30 || Math.round(evenement.beta) > 30) {
            var setnbWalk = parseInt($(".nb-step span").text())
            setnbWalk = setnbWalk + 1;
            $(".nb-step span").html(setnbWalk);
        }
    }, false);
} else if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth <= 1024) {
    $(".ctn-responsive").removeClass("col-lg-4");
    $(".ctn-responsive").addClass("col-lg-6");
}

/*----------CHART SOMMEIL----------*/
var sleepChart = document.getElementById("chart-sleep");
//GRADIENT
var contextSleep = sleepChart.getContext('2d');
var gradientSleep = contextSleep.createLinearGradient(0, 0, 200, 0);
gradientSleep.addColorStop(0, '#F4E932');//JAUNE
gradientSleep.addColorStop(0.50, '#96C84E');//VERT
gradientSleep.addColorStop(1, '#219CC5');//BLEU

//CHARTS
var date = new Date(),
    dateSleep = [],
    timeSleep = [],
    mois = new Array("jan", "fev", "mar", "avr", "mai", "jui", "juil", "aout", "sep", "oct", "nov", "dec");


var myBar = new Chart(sleepChart, {
    type: 'bar',
    data: {
        labels: dateSleep,
        datasets: [{
            label: 'Temps de sommeil',
            data: timeSleep,
            borderColor: gradientSleep,
            backgroundColor: gradientSleep,
            lineTension: 0.2,
            borderWidth: 3,
            fontColor: "white"
        }]
    },
    options: {
        labels: {
            fontColor: "#ffffff",
        },
        title: {
            display: true,
            text: 'Sommeil',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#ffffff"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544",
            position: 'average'
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
                    beginAtZero: true,
                    fontColor: "white"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        },
    }

});
function dateFr() {
    var message = date.getDate() + " ";
    message += mois[date.getMonth()] + " ";
    return message;
}

//AJOUT SOMMEIL
document.querySelector("#save-sleep").addEventListener("click", function () {
    var hourGoBed = $("#number-sleep1").val(),
        hourWakeup = $("#number-sleep2").val(),
        valDateGoBed = new Date(hourGoBed),
        valDateWakeup = new Date(hourWakeup),
        diff = DateDiff(valDateWakeup, valDateGoBed);



    function DateDiff(date1, date2) {
        var diff = {}                               // Initialisation du retour
        var tmp = date1 - date2;

        tmp = Math.floor(tmp / 1000);               // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                        // Extraction du nombre de secondes

        tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                        // Extraction du nombre de minutes

        tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                       // Extraction du nombre d'heures

        tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
        diff.day = tmp;

        return diff;
    }

    for (var i = 0; i <= dateSleep.length; i++) {
        if (dateFr() == dateSleep[i]) {
            console.log(dateSleep)
            timeSleep.splice(0, i, diff.hour);
            window.myBar.update()
            break
        } else {
            timeSleep.push(diff.hour)
            dateSleep.push(dateFr())
            if (dateSleep.length == 7) {
                dateSleep.splice(0, 7)
                timeSleep.splice(0, 7)
                dateSleep.push(dateFr())
                timeSleep.push(diff.hour)
            }
            window.myBar.update()
        }
    }
})

/*----------CHART WATER----------*/
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
            fontColor: "#ffffff",
            padding: 0
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544",
            position: 'average'
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

document.querySelector("#save-water").addEventListener("click", function () {
    var inputWater = $("#number-water").val(),
        userWater = null;
    userWater = inputWater;

    if (myDoughnutChart.data.datasets.length > 0) {
        var inputWater = $("#number-water").val();
        var userWaterML = userWater * 250;
        var newAllwater = Water[0] - userWaterML;
        Water[0] = newAllwater;
        Water.push(userWaterML);
        window.myDoughnut.update()
        if (Water[0] <= 0) {
            Water.shift()
            window.myDoughnut.update()
            $("#result-water").css("color", "#219CC5")
            $("#result-water").css("font-weight", "bold")
        }
        $("#result-water").html(eval(Water.join(" + ")) - newAllwater)
        parseInt(inputWater)
    }
    $("#number-water").val(0)

})

/*----------CHART CARDIAC----------*/
var cardiacChart = document.getElementById("chart-cardiac");
//GRADIENT
var contextCardiac = cardiacChart.getContext('2d');
var gradientCardiac = contextCardiac.createLinearGradient(0, 0, 200, 0);
gradientCardiac.addColorStop(0, '#F4E932');//JAUNE
gradientCardiac.addColorStop(0.50, '#96C84E');//VERT
gradientCardiac.addColorStop(1, '#219CC5');//BLEU
//CHARTS
var myChart = new Chart(cardiacChart, {
    type: 'line',
    data: {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [{
            label: 'Pulsation Cardiaque',
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
            text: 'Fréquence Cardiaque',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#ffffff"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544",
            position: 'average'
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
                    beginAtZero: true,
                    fontColor: "white"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        }
    }
})

/*----------CHART WEIGHT----------*/
var weightChart = document.getElementById("chart-weight"),
    dataWeight = [],
    dateWeight = [];
//GRADIENT
var contextWeight = weightChart.getContext('2d');
var gradientWeight = contextWeight.createLinearGradient(0, 0, 200, 0);
gradientWeight.addColorStop(0, '#F4E932');//JAUNE
gradientWeight.addColorStop(0.50, '#96C84E');//VERT
gradientWeight.addColorStop(1, '#219CC5');//BLEU
//CHARTS
var myChart2 = new Chart(weightChart, {
    type: 'line',
    data: {
        labels: dateWeight,
        datasets: [{
            label: 'Evolution du poids',
            data: dataWeight,
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
            text: 'Poids',
            fontSize: "18",
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontColor: "#ffffff"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 14,
            titleFontFamily: "'Roboto', 'Arial', sans-serif",
            bodyFontFamily: "'Roboto', 'Arial', sans-serif",
            backgroundColor: "#2D3544",
            position: 'average'
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
                    beginAtZero: true,
                    fontColor: "white"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        }
    }
})

document.querySelector("#save-weight").addEventListener("click", function () {
    var inputWeight = $("#number-weight").val();
    dataWeight.push(inputWeight);
    dateWeight.push(dateFr())
    $("#number-weight").text("{{ weight }}")
    window.myChart2.update();
});


