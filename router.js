module.exports = function(app) {

  //request, response, next is mostly for error handling
  //router handler
  app.get('/', function(req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  });
}
