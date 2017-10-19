const Authentication = require('./controllers/authentication');


module.exports = function(app) {

  //request, response, next is mostly for error handling
  //router handler
app.post('/signup', Authentication.signup);


}
