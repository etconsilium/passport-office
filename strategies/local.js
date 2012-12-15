module.exports= 
  new require('passport-local').Strategy( 
    function(username, password, done){
      process.nextTick(function(){
        console.log('local verify');
        return done(username);
      })
    }
    ,
    function(req,res,next){
      console.log(arguments);
      return next(req,res);
    }
);
