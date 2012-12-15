module.exports = {
  host:'127.0.0.1'
  ,port: 27017
  ,db: 'AUTH'
  ,collection: 'default'
  ,username:undefined
  ,password:undefined
  ,options: {
    auto_reconnect: true
    ,native_parser: false
    ,safe: true
  }
}
module.exports.getUrl=function(){ //  потому что для некоторых библиотек параметр url является решающим
  return
    (module.exports.username?module.exports.username+':'+module.exports.password+'@':'')
    +module.exports.host
    +(module.exports.port?':'+module.exports.port:'')
    +(module.exports.db?'/'+module.exports.db:'/test')
  ;
}
