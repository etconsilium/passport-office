
var o = options = require('./options.js');
var app = express.createServer(
	{  // не слабо хттпс поднять
		cert: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.crt')
	  , key: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.key')
	  , ca: fs.readFileSync('/var/local/apache2-ssl/sub.class1.server.startssl.ca.pem')
    // The CA (us in this case)
    // ca: fs.readFileSync('ssl/ca.crt'),
    // Ask for the client's cert
    // requestCert: true,
    // Don't automatically reject
    // rejectUnauthorized: false
	}
);
app.o = app.options = options;

app.configure( function () {
  app.set('port', app.o.port);
  app.set('view engine', app.o['view engine']);
  app.set('views', app.o.view);
  app.set('view layout', app.o['view layout']);
  app.set('view options', app.o['view options']); //  переменные

  app.use(express.favicon());

  // не требуются, т.к. сверху стоит апач
  //app.use(express.methodOverride());
  //app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.logger('dev'));
  app.use(express.static(APPROOT + '/public'));   //  если не требуется обработка, парсинг, сессии и роутинг, то надо здесь

  var MongoStore = require('connect-mongo')(express);

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: (Date.now()).toString()}));
  app.use(express.session({
    secret: (Date.now()).toString()
   ,store: require(APPROOT+'/db/options.js').extend({db:'SESSION'})
  }));

  app.use(app.router);
  app.use(express.errorHandler());

});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

module.exports=app;
