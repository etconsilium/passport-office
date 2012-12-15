// module.exports = require('mongoskin').db( require('./options.js').url );
var config=require('./options.js');
module.exports = require('mongoskin').db( 
		config.extend({db:'AUTH'})
		,config.options 
	);