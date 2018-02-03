/* EXPRESS */
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const twig = require('twig')
const app = express();

/* CREATION DU SERVER */
const server = require('http').createServer(app);
/* variable globales */
var port = 1337;

/* ROAD TO ASSETS DIRECTORY */
app.use('/css', express.static(__dirname + 'web-app/assets/css'));
app.use('/js', express.static(__dirname + 'web-app/assets/js'));
app.use('/img', express.static(__dirname + 'web-app/assets/img'));
app.use('/fonts', express.static(__dirname + 'web-app/assets/fonts'));

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

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* road for start page */
app.get('/', function (req, res) {
    res.sendFile(__dirname + 'web-app/views/pages/index.twig');
});

server.listen(port);
console.log("application live on port " + port);
