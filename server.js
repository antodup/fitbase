/* EXPRESS */
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Twig = require('twig')
const bcrypt = require('bcrypt')
const app = express();

/* CREATION DU SERVER */
const server = require('http').createServer(app);

/* variable globales */
var port = 1337;

/* ROAD TO ASSETS DIRECTORY */
app.use('/css', express.static('web-app/assets/css'));
app.use('/js', express.static('web-app/assets/js'));
app.use('/img', express.static('web-app/assets/img'));
app.use('/fonts', express.static('web-app/assets/fonts'));

//connection for windows
/*var connection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fitbase'
    });
}*/

//connection for mac
var connection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'fitbase',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });
}

//config bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//config twig
app.set('views', [__dirname + '/web-app/views/pages', __dirname + '/web-app/views', __dirname + '/web-app/views/layout']);
/*app.set("twig options", {
    strict_variables: false
});*/

/* road for start page */
app.get('/', function (req, res) {
    res.render('index.twig');
});

/* road for profil page */
app.post('/profil', function (req, res) {
    //Let = à une variable de type var sauf que la la portée change selon son emplacement (limité)
    console.log(req.body.login)
    let q = "select * from users where email like '" + req.body.login + "';",
        co = connection();
    co.connect();
    co.query(q, function (error, results, fields) {
        if (error) return console.log(error);
        //Pour quoi console.log(results) me retourne un tabeleau vide
        if (results.length > 0) { //Pour quoi on peut pas checker le mail direct comme ca => results[0].email == req.body.login j'ai tester mais ca fonctionne pas et je comprends pas pourquoi ?
            bcrypt.compare(req.body.password, results[0].password).then(function (password) {
                if (password === true) {
                    console.log('win')
                    res.render('profil.twig');
                } else {
                    console.log('game over')
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/')
        }
    })
    /* Tu as trvailler le check du mot de passe en mode sync alors
    que dans la doc il recomande en mode async je l'ai donc travailler
    comme ca. (en plus au niveau de la syntax cela me parait plus clair)
    D'ailleurs tu me réexpliquera la différence exact entre le sync et l'async
     */
    console.log("connecté ! ;-)")//test
});

/* road for paremètre page */
app.get('/parametres', function (req, res) {
    res.render('parameters.twig');
});

/* road for santé page */
app.get('/sante', function (req, res) {
    res.render('health.twig');
});

/* road for sport page */
app.get('/sport', function (req, res) {
    res.render('sport.twig');
});

/* road for sport page */
app.get('/inscription', function (req, res) {
    res.render('register.twig');
});

/* road for contact page */
app.get('/contact', function (req, res) {
    res.render('contact.twig');
});

/* road for login page */
app.get('/connexion', function (req, res) {
    res.render('login.twig');
});

/*Page 404*/
app.use(function (req, res) {
    res.status(400);
    res.render('404.twig');
});

/*Pour V2 erreur 500
app.use(function(req, res) {
    res.status(500);
    res.render('index.twig'); // A CHANGER QUAND LA PAGE 404 OK
});*/


server.listen(port);
console.log("application live on port " + port);
