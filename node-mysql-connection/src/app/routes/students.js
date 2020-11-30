var dbConnection = require('../../config/dbConnection');
//console.log(dbConnection);

var username = "";


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
    username = request.body.username;
    var password = request.body.password;
    console.log(username)
    if (username && password){
      connection.query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.render('logged-in', { studentlist : username})
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

app.get('/add-students', (request, response) => {
  if(request.session.loggedin == true) {
    connection.query('SELECT * FROM students', (err, result) => {
      console.log(result);
      response.render('add-students', {
        studentlist: request.session.username
      });
    });
  } else {
    response.send('Access DENIED');
  }
});

app.get('/show-students', (request, response) => {
  if(request.session.loggedin == true) {
    connection.query('SELECT * FROM students', (err, result) => {
      console.log(request.session.username);
      response.render('show-students', {
        studentlist: request.session.username,
        students : result
      });
    });
  } else {
    response.send('Access DENIED');
  }
});

app.get('/logged-in', (request, response) => {
  if(request.session.loggedin == true) {
    connection.query('SELECT * FROM students', (err, result) => {
      console.log(result);
      response.render('logged-in', {
        studentlist: request.session.username
      });
    });
  } else {
    response.send('Access DENIED');
  }
});

// app.get('/logged-in/#about', (req, res) => {
//   connection.query('SELECT * FROM students', (err, result) => {
//     console.log(result);
//     const newLocal = username;
//     res.render('logged-in/#about', {
//       studentlist: newLocal
//     });
//   });
// });

const getByUsername = (pUser) => {
  return new Promise((resolve,reject) => {
    connection.query('SELECT * FROM credentials WHERE username = ?', [pUser],(err, rows) => {
      if (err) reject(err)
      resolve(rows[0])
      });
  });
};

}
