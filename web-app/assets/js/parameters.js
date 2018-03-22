var btn_info = document.querySelector('#info-perso')
var btn_notif = document.querySelector('#auto-notif')

var div_info = document.querySelector('.info-perso')
var div_notif = document.querySelector('.auto-notif')

btn_info.addEventListener('click', function (){
    div_info.style.display="flex"
    btn_info.classList.add('focus')
    div_notif.style.display="none"
    btn_notif.classList.remove('focus')
}, false)

btn_notif.addEventListener('click', function (){
    div_info.style.display="none"
    btn_info.classList.remove('focus')
    div_notif.style.display="flex"
    btn_notif.classList.add('focus')
}, false)
