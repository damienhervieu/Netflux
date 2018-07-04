exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){
       var post  = req.body;
       var email = post.email;
       var password = post.password;
      
       var sql="SELECT id, first_name, last_name, email FROM `users` WHERE `email`='" + email + "' and `password` = '" + password + "'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/');
          }
          else{
             message = 'Invalid credentials provided';
             res.render('index',{message: message});
          }
                  
       });
    } else {
       res.render('index',{message: message});
    }         
 };


 exports.register = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var first_name = post.first_name;
       var last_name = post.last_name;
       var email = post.email;
       var emailConfirm = post.emailConfirm;
       var password = post.password;
       var passwordConfirm = post.passwordConfirm;
    
        if(email != emailConfirm) {
            message = "Please enter the same email in the fields";
        } else if (password != passwordConfirms) {
            message = "Please enter the same password";
        } else if (email != emailConfirm && password != passwordConfirm) {
            message = "Please enter the same email and password in the allocated fields";
        } else {

            var sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`,`password`) VALUES ('" + first_name + "','" + last_name + "','" + email + "','" + password + "')";
      
            var query = db.query(sql, function(err, result) {
      
               message = "Successfully! Your account has been created.";
               res.render('register',{message: message});
            });

        }
    } else {
       res.render('register');
    }
 };