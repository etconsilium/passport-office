
var	_default=require('./default.js');
var _modules={
	facebook   : require('./facebook.js')
	// ,vkontakte : require('./vkontakte.js')
	// ,twitter   : require('./twitter.js')
}
$_.each(_modules,function(e,i){
	e.strategy=$_.extend({},_default.strategy,e.strategy);
	// e=$_.defaults(_default,e);
	e.name=i;
	e.strategy.file='passport-'+e.name;
	e.strategy.instance=require(e.strategy.file).Strategy;
	e.routes=('object' == typeof e.routes)
			? e.routes
			: require(APPROOT+'/routes/'+e.name+'.js');

	e.authenticate=$_.extend({},_default.authenticate,e.authenticate);

console.log(e);
})

module.exports=_modules;