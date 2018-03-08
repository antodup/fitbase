/*============================================================
#title            : TITLE
#description      : Script for register
#author           : DUPRE ANTHONY
#date             : 2018/03/04
#version          : Constantly on progress
#usage            : JAVASCRIPT
#notes            : 
=============================================================*/
/*VERIFICATION FORMULAIRE
var inputPart1 = document.querySelectorAll("#part1 input");

for (var i = 0; i < inputPart1.length; i++) {
    console.log(inputPart1[i])
    if (inputPart1[i].value == "") {
        console.log("ok")
        alert("la valeur est vide")
    }
}

console.log(document.querySelectorAll("#part1 input"))*/

//INPUT RANGE
var $inputRange = $('input[type="range"]');

$inputRange.rangeslider({
    polyfill: false,
    onInit: function () {
        var $handle = $('.rangeslider__handle', this.$range);
        updateHandle($handle[0], this.value);
    }
}).on('input', function (e) {
        var $handle = $('.rangeslider__handle', e.target.nextSibling);
        updateHandle($handle[0], this.value);
    });

function updateHandle(el, val) {
    el.textContent = val;
}
