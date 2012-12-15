module.exports = {
  '/facebook' : function(request, response, next) {
    passport.authenticate('facebook'
      ,{ successRedirect:'/'
        ,failureRedirect:'/login'
        ,scope:['user_status', 'user_checkins']  //  разрешения доступа
        ,skip_api_login:1
        ,display:'popup'
        ,strategy:"facebook"
      }
      ,function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        // res.write('auth');
        // res.end();
      }
    )(request, response, next);
    // response.end();
  }
,
  '/facebook/callback' : function(request, response, next) {

    passport.authenticate('facebook', { successRedirect:'/', failureRedirect: '/login' }
      ,function(accessToken, refreshToken, profile, done){
        console.log('auth');
        console.log(profile);
        console.log(done);
        // res.redirect('/');
      }
    )(request, response, next);
    response.end();
  }
}
