
// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

//var config   = require('settings/providers.js').facebook;
var passport = require('passport'); //  внезапно, это оказался синглтон

module.exports = {
  authPath : function(request, response, next) {
    console.log('url',request.url);
    passport.authenticate('vkontakte',
      function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        res.write('auth');
        res.end();
      }
    )(request, response, next);
  }
,
  callbackPath : function(request, response, next) {
    res.write(res);
    res.end();
  }
  //app.get('/auth/facebook/callback',
  //  passport.authenticate('facebook', { failureRedirect: '/login' }),
  //  function(req, res) {
  //    res.redirect('/');
  //  });
  //
  //app.get('/logout', function(req, res){
  //  req.logout();
  //  res.redirect('/');
  //});

}
