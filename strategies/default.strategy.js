module.exports={
	instance: (console.log('define Strategy! file '+__filename))	//	require(filename).Strategy
	,options:{	//	первый параметр мидвари
		callbackURL:'/name/callback'	//	@see ./index.js
		,clientID:null
		,clientSecret:null
		,consumerKey:null
		,consumerSecret:null
		,etc:'@see man Passport'
	}
	,verify: function(/*4 параметра*/){console.log('verify-default',arguments); }
	//	колбек стратегии, второй параметр
	,callback: function(req,res,next){console.log('callback-default',arguments);return next(req,res);}
}