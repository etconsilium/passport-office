module.exports={
	name:undefined

	,strategy:{
		filename:undefined
		,instance: (console.log('define Strategy! file '+__filename))	//	require(filename).Strategy
		,options:{	//	первый параметр мидвари
			callbackURL:'/name/callback'	//	@see ./index.js
			,clientID:null
			,clientSecret:null
			,consumerKey:null
			,consumerSecret:null
			,etc:'@see man Passport'
		}
		,verify: function(/*4 параметра*/){console.log(arguments); }
		//	колбек стратегии, второй параметр
	}
	,authenticate:{
		options:{
			//	: passport.authenticate( @parameter )
			successRedirect:'/'
			,failureRedirect:'/login'
			,scope:[]	//	разрешения доступа, см. man Passport
		}
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