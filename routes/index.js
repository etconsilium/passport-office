
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };
module.exports=exports.extend({
	local     : require('./local.js')
	,facebook : require('./facebook.js');
});