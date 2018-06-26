  // Function to register users and insert them into the set database
  exports.register = function(req, res) {
      var today = new Date();

      var users = {
          "first_name": req.body.first_name,
          "last_name": req.body.last_name,
          "email": req.body.email,
          "password": req.body.password,
          "permission": "member",
          "created_at": today,
          "changed_at": today,
      }

      connection.query('INSERT INTO t_users SET ?', users, function (error, results, fields){
          if (error) {
              console.log("An error has occured during the insertion in the database : ", error);
              res.send({
                  "code": 400,
                  "failed": "Insertion compromised"
              })
          } else {
              console.log("Insertion applied to the database");
              res.send({
                  "code": 200,
                  "success": "User has been registered through the database"
              });
          }
      });
  }

  // Function to authenticate and find the user through the database
  exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

        connection.query('SELECT * FROM t_users WHERE email = ?', [email], function (error, results, fields){
            if (error) {
                console.log("An error occured during the database control : ", error);
                res.send({
                    "code": 400,
                    "failed": "Select query failed"
                });
            } else {
                if(results.length > 0){
                    if([0].password == password){
                        res.send({
                            "code": 200,
                            "success": "User's logged in"
                        });
                    } else {
                        res.send({
                            "code": 204,
                            "success": "Invalid credentials were provided"
                        });
                    }
                

                } else {
                    res.send({
                        "code": 204,
                        "success": "Email not in the database"
                    });
                }
            }
        });
  }