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
}

app.get('/add-students', (req, res) => {
  connection.query('SELECT * FROM students', (err, result) => {
    console.log(result);
    res.render('add-students', {
      studentlist: result
    });
  });
});
}
