/* EXPRESS */
const express =     require('express')
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const Twig =        require('twig')
const bcrypt =      require('bcrypt')
const session =     require('express-session')
const app =         express();

/* CREATION DU SERVER */
const server = require('http').createServer(app);
var users = null;

/* variable globales */
var port = 1337;

/* ROAD TO ASSETS DIRECTORY */
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}))
app.use('/css', express.static('web-app/assets/css'));
app.use('/js', express.static('web-app/assets/js'));
app.use('/img', express.static('web-app/assets/img'));
app.use('/fonts', express.static('web-app/assets/fonts'));

//connection to bdd
var connection = function () {
    return mysql.createConnection({
        host: 'mysql-fitbase.alwaysdata.net',
        user: 'fitbase',
        password: 'totolola42',
        database: 'fitbase_bdd'
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
    console.log(req.session.someAttribute)
    if (req.session.someAttribute != undefined) {
        let sessData = req.session
        sessData.someAttribute = undefined;
    }
    res.render('index.twig');
});

app.post('/', function (req, res) {

    let co = connection();
    co.connect();
    co.query("select * from users where email like '" + req.body.email + "';", function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password).then(function (password) {
                if (password === true) {
                    var sessData = req.session;
                    sessData.someAttribute = results[0].id;
                    res.redirect('/profil');
                } else {
                    res.render('index.twig', {
                        checkPassword : password
                    })
                }
            })
        } else {
            res.render('index.twig')
        }
    })
});

/* road for inscription page */
app.get('/inscription', function (req, res) {
    var sport,
        objectif,
        co = connection();
    co.connect();
    co.query("select * from sport;", function (error, results, fields) {
        if (error) return console.log(error);
        sport = results;
        co.query("select * from objectifs;", function (error, results, fields) {
            if (error) return console.log(error);
            objectif = results;
            res.render('register.twig', {
                sports : sport,
                objectifs : objectif
            });
        })
    })
});

/* road for profil page */
app.get('/profil', function (req, res) {
    //Let = à une variable de type var sauf que la la portée change selon son emplacement (limité)
    //récupérer les infos du user en fonction de l'id contenu dans req.session
    console.log(req.session.someAttribute)
    if (req.session.someAttribute == undefined) {
        res.redirect('/')
    }
    var user_id = req.session.someAttribute,
        co = connection();
    co.connect();
    co.query("SELECT * FROM users WHERE id = "+user_id, function (error, results, fields) {
        if (error) return console.log(error)
        user = results[0]
        co.query("SELECT DATE_FORMAT(birthday, \"%Y %c %d\") AS birthday FROM users WHERE id = "+user_id, function (error, results, fields) {
            if (error) return console.log(error)
            user.birthday = results[0].birthday
            let birthday = new Date(user.birthday)
            let ageDifMs = Date.now() - birthday.getTime();
            let ageDate = new Date(ageDifMs);
            user.birthday = Math.abs(ageDate.getUTCFullYear() - 1970);
            co.query("SELECT s.* FROM sport s, link_user_sport lus WHERE lus.user_id = "+ user_id + " AND s.id = lus.sport_id", function (error, results, fields) {
                if (error) return console.log(error)
                let sports = results
                co.query("SELECT o.* FROM objectifs o, link_user_objectifs luo WHERE luo.id_user = " + user_id + " AND luo.id_objectifs = o.id" , function (error, results, fields) {
                    if (error) return console.log(error)
                    let objectif = results[0]
                    co.query("SELECT r.* FROM reward r, link_user_reward lur WHERE lur.id_user = " + user_id + " AND lur.id_reward = r.id", function (error, results, fields) {
                        if (error) return console.log(error)
                        let user_rewards = results
                        console.log(user_rewards)
                        co.query("SELECT * FROM reward", function (error, results, fields) {
                            if (error) return console.log(error)
                            let rewards = results
                            res.render('profil.twig', {
                                user: user,
                                sports : sports,
                                objectif: objectif,
                                user_rewards: user_rewards,
                                rewards: rewards
                            })
                        })

                    })
                })

            })
        })
    })

});

app.post('/inscription', function (req, res) {
    let q = "select * from users where email like '" + req.body.email + "';",
        co = connection();
    co.connect();
    co.query(q, function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0){
            res.redirect('/');//cet email est deja existant
        }
        var hash = bcrypt.hashSync(req.body.password1, 10);
        let q = "insert into users (`lastname`, `firstname`, `username`, `birthday`, `email`, `password`, `height`, `weight`, `frequencies`, `objectif`, `profil_picture`, `notification`, `geolocation`) values ('" + req.body.lastname + "', '" + req.body.firstname + "', '" + req.body.username + "', '" + req.body.birthday + "', '" + req.body.email + "', '" + hash + "', " + req.body.height + ", " + req.body.weight + ", " + req.body.frequencies + ", " + req.body.objectif + ", '', false, false)";
        co.query(q, function (error, results, fields) {
            if (error) return console.log(error);

            var sessData = req.session;
            sessData.someAttribute = results.insertId;
            res.redirect("/profil");
        })

    })
});

/* road for paremètre page */
app.get('/parametres', function (req, res) {
    console.log(req.session.someAttribute)
    if (req.session.someAttribute == undefined) {
        res.redirect('/')
    } else {
        res.render('parameters.twig');
    }
});

/* road for santé page */
app.get('/sante', function (req, res) {
    console.log(req.session.someAttribute)
    if (req.session.someAttribute == undefined) {
        res.redirect('/')
    } else {
        res.render('health.twig');
    }
});

/* road for sport page */
app.get('/sport', function (req, res) {
    console.log(req.session.someAttribute)
    if (req.session.someAttribute == undefined) {
        res.redirect('/')
    } else {
        res.render('sport.twig');
    }
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
