
/**
 * 
 */

var config=require('../settings/providers.js').facebook;
var passport=require('passport');

var strategy = require('passport-facebook').Strategy;

// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.

passport.use(new strategy( {
      clientID    : config.appId
    , clientSecret: config.appSecret
    , callbackURL : config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('\n\naccess:',accessToken, 
                  '\n\nrefresh:',refreshToken,
                  '\n\nprofile:', profile,
                  '\n\ndone:', done
                  );
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
)); //  passport

module.exports={};
module.exports.route=[];
module.exports.route[config.authPath] = function(req, res, next) {
  console.log('url',req.url);
  passport.authenticate('facebook',
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
      res.write('auth');
      res.end();
    }
  )(req, res, next);
}


// module.exports = function (request, response, next) {
//   this.appId=config.appId;
//   this.appSecret=config.appSecret;
//   //this.strategy = strategy;

//   // console.log('\n111req:',request,'\nres:',response,'\nnext:',next);

//   //app.get('/account', ensureAuthenticated, function(req, res){
//   //  res.render('account', { user: req.user });
//   //});

//   //app.get('/login', function(req, res){
//   //  res.render('login', { user: req.user });
//   //});

//   // GET /auth/facebook
//   // Use passport.authenticate() as route middleware to authenticate the
//   // request. The first step in Facebook authentication will involve
//   // redirecting the user to facebook.com. After authorization, Facebook will
//   // redirect the user back to this application at /auth/facebook/callback
  
//   console.log('url',request.url);

//   // this.router[config.authPath] = function(req, res, next) {
//   if (request.url == config.authPath) {
//     passport.authenticate('facebook',
//       function(req, res){
//         // The request will be redirected to Facebook for authentication, so this
//         // function will not be called.
//         res.write('auth');
//         res.end();
//       }
//     )(req, res, next);
//   }

//   this.router[config.callbackPath] = function(req, res, next) {
//     passport.authenticate('facebook', 
//       { failureRedirect: '/login' }, // { successRedirect: '/', failureRedirect: '/login' }
//       function(req, res) {
//         res.write(res);
//         res.end();
//         res.redirect('/');
//       }
//     )(req, res, next);
//   }

//   // GET /auth/facebook/callback
//   // Use passport.authenticate() as route middleware to authenticate the
//   // request. If authentication fails, the user will be redirected back to the
//   // login page. Otherwise, the primary route function function will be called,
//   // which, in this example, will redirect the user to the home page.

//   //app.get('/auth/facebook/callback',
//   //  passport.authenticate('facebook', { failureRedirect: '/login' }),
//   //  function(req, res) {
//   //    res.redirect('/');
//   //  });
//   //
//   //app.get('/logout', function(req, res){
//   //  req.logout();
//   //  res.redirect('/');
//   //});

//   // Simple route middleware to ensure user is authenticated.
//   // Use this route middleware on any resource that needs to be protected. If
//   // the request is authenticated (typically via a persistent login session),
//   // the request will proceed. Otherwise, the user will be redirected to the
//   // login page.
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login')
//   }

// }