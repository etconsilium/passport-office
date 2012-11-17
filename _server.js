
/**
 * попробуем такю структуру модуля
 * 1. подгрузка модулей
 * 2. константы, конфиги
 * 3. запуск
 */

var
  _ = $_     = require('underscore')
  , $s       = require('string')
  , $extend  = require('object.extend')
  , $php     = require('phpjs')
  , uuid     = require('node-uuid')

  , fs       = require('fs')
  , util     = require('util')

  , passport = require('passport')
  , express  = require('express')

  , db       = require('./settings/db.js')({dbname:'session'})
  , mongoStore = new require('connect-mongodb')({db: db})

;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
}); 

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}
function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}





//  create server
var app = express.createServer( {
      cert: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.crt')
    , key: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.key')
    , ca: fs.readFileSync('/var/local/apache2-ssl/sub.class1.server.startssl.ca.pem')
    , requestCert: true
    // The CA (us in this case)
    // ca: fs.readFileSync('ssl/ca.crt'),
    // Ask for the client's cert
    // requestCert: true,
    // Don't automatically reject
    // rejectUnauthorized: false
  }
);
//  configure server
app.configure( function () {
  app.set('port', 3210);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  //app.set('view layout', false);
  //app.use(express.favicon());
  // не требуются, т.к. сверху стоит апач
  //app.use(express.methodOverride());
  //app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: $php.microtime(), store: mongoStore }) );

  app.use(passport.initialize());
  app.use(passport.session());
});


var providers = require('./settings/providers.js');

//  Strategy define section
$_.each(providers,
  function(config, key, list) {
    if (!!config.name) {

      if (!!config.appId) {   //  a'la fb
        var strategy = require(config.strategy).Strategy;

        passport.use(new strategy( {
              clientID    : config.appId
            , clientSecret: config.appSecret
            , callbackURL : config.callbackURL
          }
          ,
          function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
              //  сохранить токены в сессию
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

        app.get( config.authPath
          , function(request, response, next) {
              console.log('url',request.url);
              passport.authenticate( config.name,
                function(req, res){
                  // The request will be redirected to Facebook for authentication, so this
                  // function will not be called.
                ;}
              )(request, response, next);
            }
        );
        app.get( config.callbackPath
          , function(request, response, next) {
              passport.authenticate( config.name
                , { failureRedirect: '/login' }
                , function (info, user, error){
                  // console.log(info, user);
                  
                  //  здесь надо пробить юзера по базе
            
                  var USERS = db.collection('Dump');
                  USERS.find({id:''+user.id, provider: user.provider})
                        .count(function(error, result){
                          console.log(result);
                          if (!result) {
                          }
                  // .toArray(function(error,result){ console.log(error, result); 
                      response.write(util.inspect(result,false));
                      response.end();

                    });

                  // response.write(util.inspect(info));
                  // response.write(util.inspect(user));
                  // response.end();
                ;}
              )
              (request, response, next);
            }
        )
      }
        
    }
  }
);


module.exports = app;
//console.log(app.set('port'));
// app.listen(app.set('port'));
app.listen(8787);