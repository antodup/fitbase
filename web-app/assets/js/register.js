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


// check click on next button

$('#part1 button[type="button"]').on('click', function () {
    var nxt = 0
    var info = []
    let inputs = this.parentNode.querySelectorAll('input')
    for (let i=0; i < inputs.length; i++) {
        let input = inputs[i]
        if (input.value != '') {
            if (i == 3) {
                let d = new Date()
                let dateInput = new Date(input.value)

                if (d < dateInput) {
                    nxt = 1
                    break
                }
            }
            if (i == 5) {
                console.log(input.value)
                console.log(inputs[6].value)
                if (input.value != inputs[6].value) {
                    nxt = 1
                    break
                }
            } else {
                info[i] = input.value
            }
        } else {
            nxt = 1
            break
        }
    }
    if (nxt != 1) {
        $('#part1').addClass('d-none')
        $('#part2').removeClass('d-none')
        $('.register-contain').append('<article>\n' +
            '            <h2>VOTRE PROFILE</h2>\n' +
            '        </article><p>Nom : '+info[0]+'</p><p> Prénom : '+info[1]+'</p><p> Pseudo : '+info[2]+'</p><p> Date de naissance : '+info[3]+'</p><p> e-mail : '+info[4]+'</p></article>')
    }
})

$('#part2 button[type="button"]').on('click', function () {
    $('#part2').addClass('d-none')
    $('#part3').removeClass('d-none')
    $('.register-contain').append('<article>\n' +
        '<h2>VOS MENSURATIONS</h2>' +
        '<p>'+$('#part2 input[name=height]').val()+'cm</p>' +
        '<p>'+$('#part2 input[name=weight]').val()+'kg</p>' +
        '</article>')
})

$('#part3 button[type="button"]').on('click', function () {
    let checkeds = $('#part3 input:checked')
    if (checkeds.length>0) {
        $('.register-contain').append('<article>\n' +
            '<h2>VOTRE SPORT</h2>' +
            '</article>')
        for (let i=0; i < checkeds.length; i++) {
            let checked = checkeds[i]
            let sport_name = checked.getAttribute('id')
            let src = $('label[for="'+sport_name+'"] img').attr('src')
            $('.register-contain article:last-child').append('<img src="'+ src +'" alt="'+ sport_name +'">\n' +
                '<p>'+ sport_name +'</p>')
        }
        $('#part3').addClass('d-none')
        $('#part4').removeClass('d-none')
    }
})

$('#part4 button[type="button"]').on('click', function () {
    let value = $('#part4 input').val()
    $('.register-contain').append('<article>\n' +
        '            <h2>FREQUENCES</h2>\n' +
        '            <p><span>'+ value +'</span> fois par semaine</p>\n' +
        '        </article>')
        $('#part4').addClass('d-none')
        $('#part5').removeClass('d-none')
})

$('#part5 button[type="submit"]').on('click', function (e) {
    let input = $('#part5 input:checked')
    if (input.length < 1) {
        e.preventDefault()
        return
    }
})
