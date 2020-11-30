var dbConnection = require('../../config/dbConnection');
//console.log(dbConnection);

module.exports = app => {
  var connection = dbConnection();

  app.get('/', (req, res) => {
    connection.query('SELECT * FROM credentials', (err, result) => {
      console.log(result);
      res.render('mainpage', {
        links: result
      });
    });
  });

  app.post('/',function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    console.log(username)
    if (username && password){
      connection.query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                isHidden = false;
                response.redirect('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }

  })

app.get('/add-students', (req, res) => {
  connection.query('SELECT * FROM students', (err, result) => {
    console.log(result);
    res.render('add-students', {
      ss: result
    });
  });
});

app.get('/show-students', (req, res) => {
  connection.query('SELECT * FROM students', (err, result) => {
    console.log(result);
    res.render('show-students', {
      studentlist: result
    });
  });
});

const getByUsername = (pUser) => {
  return new Promise((resolve,reject) => {
    connection.query('SELECT * FROM credentials WHERE username = ?', [pUser],(err, rows) => {
      if (err) reject(err)
      resolve(rows[0])
      });
  });
};

// app.post('/', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
//         isHidden = false;
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });
//
// app.post('/', async (req, res) => {
//     try{
//         let foundUser = links.find((data) => req.body.email === data.email);
//         if (foundUser) {
//
//             let submittedPass = req.body.password;
//             let storedPass = foundUser.password;
//
//             const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
//             if (passwordMatch) {
//                 let usrname = foundUser.username;
//                 res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
//             } else {
//                 res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
//             }
//         }
//         else {
//
//             let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
//             await bcrypt.compare(req.body.password, fakePass);
//
//             res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
//         }
//     } catch{
//         res.send("Internal server error");
//     }
// });

}
