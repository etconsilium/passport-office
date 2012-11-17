module.exports = {
  host:'127.0.0.1'
  , port: 27017
  , dbname: 'test'
  , options: {
    auto_reconnect: true
    , native_parser: false
  }
  ,username:undefined
  ,password:undefined
}
module.exports.url
  =(module.exports.username?module.exports.username+':'+module.exports.password+'@':'')
  +module.exports.host
  +(module.exports.port?':'+module.exports.port:'')
  +(module.exports.dbname?'/'+module.exports.dbname:'')
