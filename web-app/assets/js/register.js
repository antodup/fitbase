/*============================================================
#title            : TITLE
#description      : Script for register
#author           : DUPRE ANTHONY
#date             : 2018/03/04
#version          : Constantly on progress
#usage            : JAVASCRIPT
#notes            : 
=============================================================*/
//RESPONSIVE
if (document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth <= 768) {
    $("form").prepend("<img class=\"logo-responsive\" src=\"/img/logo.svg\" alt=\"logo\"/>");
}

//SPORT
$('input[name="sport"]').on("click", function () {
    if ($(this).prop("checked") == true) {
        $(this).parent().children("label").css("background-color", "#2D3544")
    } else {
        $(this).parent().children("label").css("background-color", "transparent")
    }
})

//OBJECTIFS
var $oldInput = null
$('input[name="objectif"]').on("click", function () {
    if ($oldInput != null) {
        $oldInput.parent().children("label").css("color", "#242428")
    }
    let $label = $(this).parent().children("label");
    $label.css("color", "white")
    $oldInput = $(this)
})

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
