/*============================================================
#title            : TITLE
#description      : Script for nav
#author           : DUPRE ANTHONY
#date             : 2018/03/15
#version          : Constantly on progress
#usage            : JAVASCRIPT
#notes            : 
=============================================================*/
var sante = 0,
    sport = 0,
    profil = 0,
    parametres = 0;

if (window.location.pathname == "/sante") {
    $("#sante-svg").css({fill: "#F4E932"})
    $("#first-line").animate({
        height: "62%",
    }, function () {
        $("p#sante").addClass("topic-show");
        $("p#sante").animate({
            opacity: "1",
        })
    })
    sante = 1;
}

if (window.location.pathname == "/sport") {
    $("#sport-svg").css({fill: "#F4E932"})
    $("#second-line").animate({
        height: "55%",
    }, function () {
        $("p#sport").addClass("topic-show");
        $("p#sport").animate({
            opacity: "1",
        })
    })
    sport = 1;
}

if (window.location.pathname == "/profil") {
    $("#profil-svg").css({fill: "#F4E932"})
    $("#third-line").animate({
        height: "55%",
    }, function () {
        $("p#profil").addClass("topic-show");
        $("p#profil").animate({
            opacity: "1",
        })
    })
    profil = 1;
}

if (window.location.pathname == "/parametres") {
    $("#parametres-svg").css({fill: "#F4E932"})
    $("#third-line").parent().addClass('hover-settings')
    $("#third-line").animate({
        height: "20%",
    }, function () {
        $("p#parametre").addClass("topic-show-2");
        $("p#parametre").animate({
            opacity: "1",
        })
    })
    parametres = 1;
}
$(".topic-block").hover(function () {
    var child = $(this).children("p");
    if ($(this).attr('href') == "/sante" && sante == 0) {
        $("#sante-svg").css({fill: "#F4E932"})
        $("#first-line").animate({
            height: "62%",
        }, function () {
            child.addClass("topic-show");
            child.animate({
                opacity: "1",
            })
        })
    }
    if ($(this).attr('href') == "/sport" && sport == 0) {
        $("#sport-svg").css({fill: "#F4E932"})
        $("#second-line").animate({
            height: "55%",
        }, function () {
            child.addClass("topic-show");
            child.animate({
                opacity: "1",
            })
        })
    }
    if ($(this).attr('href') == "/profil" && profil == 0) {
        $("#profil-svg").css({fill: "#F4E932"})
        $("#third-line").animate({
            height: "55%",
        }, function () {
            child.addClass("topic-show");
            child.animate({
                opacity: "1",
            })
        })
    }

    if ($(this).attr('href') == "/parametres" && parametres == 0) {
        $("#parametres-svg").css({fill: "#F4E932"})
        $("#third-line").parent().addClass('hover-settings')
        $("#third-line").animate({
            height: "20%",
        }, function () {
            child.addClass("topic-show-2");
            child.animate({
                opacity: "1",
            })
        })
    }
}, function () {
    if ($(this).attr('href') == "/sante" && sante == 0) {
        var child = $(this).children("p")
        $(".svg-picto").css({fill: "#FFFFFF"})
        child.animate({
            opacity: "0",
        })
        child.removeClass("topic-show");
        child.removeClass("topic-show-2");
        if ($(this).attr("href") == '/parametres') {
            $(this).prev().children(".nav-line").animate({
                height: "100%",
            }, function () {
                $("#third-line").parent().removeClass('hover-settings')
            })
        }
        $(this).next().children(".nav-line").animate({
            height: "100%",
        }, function () {
            $("#third-line").parent().removeClass('hover-settings')
        })
    }
    if ($(this).attr('href') == "/profil" && profil == 0) {
        var child = $(this).children("p")
        $(".svg-picto").css({fill: "#FFFFFF"})
        child.animate({
            opacity: "0",
        })
        child.removeClass("topic-show");
        child.removeClass("topic-show-2");
        if ($(this).attr("href") == '/parametres') {
            $(this).prev().children(".nav-line").animate({
                height: "100%",
            }, function () {
                $("#third-line").parent().removeClass('hover-settings')
            })
        }
        $(this).next().children(".nav-line").animate({
            height: "100%",
        }, function () {
            $("#third-line").parent().removeClass('hover-settings')
        })
    }

    if ($(this).attr('href') == "/sport" && sport == 0) {
        var child = $(this).children("p")
        $(".svg-picto").css({fill: "#FFFFFF"})
        child.animate({
            opacity: "0",
        })
        child.removeClass("topic-show");
        child.removeClass("topic-show-2");
        if ($(this).attr("href") == '/parametres') {
            $(this).prev().children(".nav-line").animate({
                height: "100%",
            }, function () {
                $("#third-line").parent().removeClass('hover-settings')
            })
        }
        $(this).next().children(".nav-line").animate({
            height: "100%",
        }, function () {
            $("#third-line").parent().removeClass('hover-settings')
        })
    }
    if ($(this).attr('href') == "/parametres" && parametres == 0) {
        var child = $(this).children("p")
        $(".svg-picto").css({fill: "#FFFFFF"})
        child.animate({
            opacity: "0",
        })
        child.removeClass("topic-show");
        child.removeClass("topic-show-2");
        if ($(this).attr("href") == '/parametres') {
            $(this).prev().children(".nav-line").animate({
                height: "100%",
            }, function () {
                $("#third-line").parent().removeClass('hover-settings')
            })
        }
        $(this).next().children(".nav-line").animate({
            height: "100%",
        }, function () {
            $("#third-line").parent().removeClass('hover-settings')
        })
    }
})
