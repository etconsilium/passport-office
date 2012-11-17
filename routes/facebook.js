
module.exports = {
  '/facebook' : function(request, response, next) {
    console.log('url',request.url);
    passport.authenticate('facebook'
      ,function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        // res.write('auth');
        // res.end();
      }
    )(request, response, next);
    response.end();
  }
,
  '/facebook/callback' : function(request, response, next) {

    passport.authenticate('facebook', { failureRedirect: '/login' }
      ,function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        // res.write('auth');
        // res.end();
      }
    )(request, response, next);
    response.write('[p]');
    response.end();
  }
}
