//	@sa strategies/default.module.js

var _strategies = require('../strategies/index.js');

$_.each(_strategies, function(s,i){
	module.exports[i] = {
		strategy: s
		, routes: require(APPROOT+'/routes/'+i+'.js')
	}
})

