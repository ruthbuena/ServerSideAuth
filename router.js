const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require ('passport');

//requireAuth is middleware/helper
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req,res){
    res.send({ message: 'Super secret code is ABC123' });
  });
app.post('/signin', requireSignin, Authentication.signin);
  //request, response, next is mostly for error handling
app.post('/signup', Authentication.signup);
}
