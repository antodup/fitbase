/*----------CHART CARDIAC----------*/
var cardiacChart = document.getElementById("chart-sport");
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
            label: "Minute d'entrainement ",
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
            backgroundColor: "#2D3544"
        },
        legends: {
            display: false,
            fontColor: "white"
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
