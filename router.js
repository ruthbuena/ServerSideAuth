const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require ('passport');

//requireAuth is middleware/helper
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.get('/', requireAuth, function(req,res){
    res.send({ hi: 'there' });
  });
  //request, response, next is mostly for error handling
app.post('/signup', Authentication.signup);
}
