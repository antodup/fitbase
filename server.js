/* EXPRESS */
const express =     require('express')
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const Twig =        require('twig')
const bcrypt =        require('bcrypt')
const app =         express();

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
var connection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fitbase'
    });
}

//connection for mac
/*var connection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'fitbase',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });
}*/

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
app.get('/profil', function (req, res) {
    console.log(req.query.mail)
    let q = "select * from users where email like '" + req.query.mail + "';",
        co = connection();
    co.connect();
    co.query(q, function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) { //verification si on a trouver un user avec l'email entrée
            if (bcrypt.compareSync(req.query.password, results[0].password)) // verifier si le mdp est le même
                res.render('profil.twig');// aller sur la page profil
        }
        res.redirect('/');// il y a eu une erreur donc retour a la page de connexion
    })
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
app.use(function(req, res) {
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
