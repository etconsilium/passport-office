passport.use(new VKontakteStrategy({
      clientID:     config.vk.appId // VK.com docs call it 'API ID'
    , clientSecret: config.vk.appSecret
    , callbackURL:  config.vk.callbackURL
  }
  ,
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done);
    //User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
    //  return done(err, user);
    //});
  }
));
