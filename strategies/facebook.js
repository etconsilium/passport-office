module.exports= 
  new (require('passport-facebook').Strategy)( 
    {
      callbackURL:APPHOST+'/facebook/callback' //  @see ./index.js
      ,clientID:'260143207435587'
      ,clientSecret:'2c12f9804dc18d8864522bbabcf31715'
    }
    ,
    function(accessToken, refreshToken, profile, done){
      process.nextTick(function(){
        console.log('facebook verify');
        console.log(profile);
        return done(profile);
      })
    }
    ,
    function(req,res,next){
      console.log(arguments);
      // return next(req,res);
    }
  )
;