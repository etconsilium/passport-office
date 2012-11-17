
this.app = express.createServer(
	{  // а не слабо ли хттпс поднять?
		cert: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.crt')
	  , key: fs.readFileSync('/var/local/apache2-ssl/2128506.ssl.key')
	  , ca: fs.readFileSync('/var/local/apache2-ssl/sub.class1.server.startssl.ca.pem')	  // The CA (us in this case)
    // ca: fs.readFileSync('ssl/ca.crt'),
    // Ask for the client's cert
    // requestCert: true,
    // Don't automatically reject
    // rejectUnauthorized: false
	}
);

app.configure( function () {
  app.set('port', 8787);
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
  app.use(express.session({ secret: 'auth_mode'}));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});


app.configure('development', function(){
  app.use(express.errorHandler());
});

//  т.к. ещё не умею делать middleware, будем просто подгружать

require('./providers/facebook.js')({config:config});



app.get('*', 'index');

app.listen();