var dbConnection = require('../../config/dbConnection');
//console.log(dbConnection);

module.exports = app => {
  var connection = dbConnection();

  app.get('/', (req, res) => {
    connection.query('SELECT * FROM students', (err, result) => {
      console.log(result);
      res.render('smalc/mainpage', {
        links: result
      });
    });
  });
}

// app.get('/students', (req, res) => {
//   connection.query('SELECT * FROM students', (err, result) => {
//     console.log(result);
//     res.render('smalc/mainpage', {
//       links: result
//     });
//   });
// });
// }
