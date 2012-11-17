if ('undefined' == typeof APPROOT) { global.APPROOT = __dirname+'/..'; }
require('./globals.js');

global.passport = require('passport');

exports.run = function(port,host,done){
	var app    = require('./app.js');
	var config = require('../passport-config/');

	// роуты здесь
	app.get('/', function(req,res){res.render('index')});

	app.use(passport.initialize());
	app.use(passport.session());

	$_.each(config, function(e,i){

		passport.use( new e.strategy.instance( e.strategy.options, e.strategy.verify ));

        $_.each(e.routes, 
          function(route, index){
            // console.log(index, route);
            // if (!!config[index]){
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
