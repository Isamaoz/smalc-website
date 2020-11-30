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

app.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
        isHidden = false;
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


}
