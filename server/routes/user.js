var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'd_netflux'
  });


exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){

        var password = req.body.password;
        var user = {
            "email": req.body.email
        }

        console.log(password + req.body.email);

    connection.query('SELECT * FROM t_users WHERE ?', user, function (error, results, fields){
        if (error) {
            console.log("An error occured during the database control : ", error);
            res.redirect('/login', {message: message});
        } else {
            console.log(results);
            if(results.length > 0){
                console.log(results[0].password);
                if(results[0].password == password){
                    message = "Aw yeah! Welcome back!";
                    req.session.userId = results[0].id_user;
                    req.session.user = results[0];
                    console.log(results[0].id_user);
                    res.redirect('/register');
                } else {
                    message = "Invalid credentials were provided";
                    res.render('index', {message: message});
                }
            

            } else {
                message = "Email not found";
                res.render('index', {message: message})
            }
        }
    });
    
    } else {
        res.render('index',{message: message});
    }     
 };


 exports.register = function(req, res){
    message = '';
    if(req.method == "POST"){
        var today = new Date();


        var password = req.body.password,
        passwordConfirm = req.body.passwordConfirm;


        var users = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password,
            "permission": 1,
            "created_at": today,
            "changed_at": today,
        }
    
        if (password != passwordConfirm) {
            message = "Please enter the same password";
            res.render('register', {message: message});
        } else if (email != emailConfirm && password != passwordConfirm) {
            message = "Please enter the same email and password in the allocated fields";
            res.render('register', {message: message});
        } else {
            connection.query('INSERT INTO t_users SET ?', users, function (error, results, fields){
                if (error) {
                    message = ("An error has occured during the insertion in the database : ", error);
                    res.redirect('/register');
                } else {
                    console.log("Insertion applied to the database");
                    message = "Your account has been created!";
                    res.redirect('/login', {message: message});
                }
            });
        }
    } else {
       res.render('register');
    }
 };

 exports.userManagement = function(req, res){
     if(req.session.permission == 2){
        message = "";
        connection.query("SELECT * FROM t_user", function (error, results, fields){    
            res.render('userManagement', results);
        });
     } else {
         res.redirect('/');
     }
 };

 exports.modifyUser = function(req, res){
     if(req.method == "POST"){
        connection.query("ALTER TABLE t_users WHERE ? SET ?", userId, modifiedUser, function(error, results, fields){
            if(error){
                message = ("An error has occured during the modification : ", error);
                res.render('modify', {message});
            } else {
                console.log("Modification applied");
                message = "Your changes have been registered!";
                res.redirect('/user-management');
            }
        })
     } else {
         res.render('modify');
     }
 }

 exports.deleteUser = function(req, res){
     if(req.method == "POST"){
        connection.query("DELETE FROM t_users WHERE ?", userId, function(error, results, fields){
            
        });
     } else {
         res.render('delete');
     }
 }

 
