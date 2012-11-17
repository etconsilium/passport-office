module.exports = {
  strategy:{
    options:{
      callbackURL:APPHOST+'/facebook/callback' //  @see ./ndex.js
      ,clientID:'260143207435587'
      ,clientSecret:'2c12f9804dc18d8864522bbabcf31715'
    }
  }
  ,authenticate:{
    options:{
      successRedirect:'/'
      ,failureRedirect:'/login'
      ,scope:['user_status', 'user_checkins']  //  разрешения доступа
    }
    ,'callback':function(p1,p2,p3,p4){console.log('nsw');}
  }
  ,widget:{
    ico:'/ico/social.me/48x48/facebook.png'
    ,html:''  //  шаблоны есть внутри стратегий, надо пересмотреть
  }
}
