/* EXPRESS */
const express =     require('express')
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const Twig =        require('twig')
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

server.listen(port);
console.log("application live on port " + port);
