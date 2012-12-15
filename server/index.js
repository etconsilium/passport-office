if ('undefined' == typeof APPROOT) { global.APPROOT = __dirname+'/..'; }
require('./globals.js');

global.passport = require('passport');
global.iii=0;

exports.run = function(port,host,done){
	var app    = require('./app.js');

	var passport_modules = require('./passport-modules.js');
	var db     = require(APPROOT+'/db/index.js');

	app.get('/', function(req,res){res.render('index')});

	app.use(passport.initialize());
	app.use(passport.session());

	$_.each(passport_modules, function(e,i){
    passport.use(e.strategy);
    $_.each(e.routes, 
      function(route, index){
          app.get(index, route);		
      }
    );
	})

	//	404 etc
	app.get('*', function(req, res) {
	    res.send('El pueblo unido jamás será vencido', 451);
	});

	app.listen(port||app.o.port, host||app.o.host);//, done||function(){console.log('server run');});
}
