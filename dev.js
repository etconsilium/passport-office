if ('undefined' == typeof APPROOT) { global.APPROOT = __dirname; }
if ('undefined' == typeof APPHOST) { global.APPHOST = 'https://auth.2128506.su'; }

// console.log( require('./passport-config/index.js') );
require('./server/index.js').run();