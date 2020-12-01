const app = require('./config/server');
//console.log(app);

require('./app/routes/students')(app);

// starting the server
app.listen(app.get('port'), () => {
  //console.log(app.get('port'));
  console.log('server on port', app.get('port'));
});
