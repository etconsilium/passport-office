module.exports={
	name:'default'

	,strategy:{
		file:'passport-strategy'
		,options:{	//	первый параметр мидвари: passport.use( new Strategy( @parameter
			callbackURL:'/callback'	//	@see ./ndex.js
			,clientID:null
			,clientSecret:null
			,consumerKey:null
			,consumerSecret:null
			,etc:'@see also man Passport'
		}
		,verify: function(/*4 параметра?*/){console.log(arguments);}
		//	колбек стратегии, второй параметр
	}
	,authenticate:{
		options:{
			//	: passport.authenticate( @parameter )
			successRedirect:'/'
			,failureRedirect:'/login'
			,scope:[]	//	разрешения доступа
		}
		,callback: function(/*4 параметра?*/){console.log(argumets);}	//	колбек стратегии, второй параметр
		//	второй параметр passport.authenticate - колбек - задаётся прямо в роутах
	}
	,routes:false	//	if !object using ../routes/{name}.js
	//	
	//	дополнительно
	,widget:{
		ico:''
		,html:''	//	шаблоны есть внутри стратегий, надо пересмотреть
	}
	,account: {
		id:""
		, name:""
		, friends:{}
		, likes:{}
		, smthng:"else"
	}
}