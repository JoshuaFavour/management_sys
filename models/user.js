var mongoose=require('mongoose')
   localMongo=require('passport-local-mongoose');

   var userSchema=new mongoose.Schema({local:{
                                    username: String,
                                    password: String
                                },
                                      facebook:{
                                    id:String,
                                    token:String,
                                    email:String,
                                    name:String

                              }})
  userSchema.plugin(localMongo)
  module.exports= new mongoose.model('User', userSchema);

  // passport.use(new FacebookStrategy({
  //     clientID: FACEBOOK_APP_ID,
  //     clientSecret: FACEBOOK_APP_SECRET,
  //     callbackURL: "http://localhost:3000/auth/facebook/callback"
  //   },
  //   function(accessToken, refreshToken, profile, cb) {
  //     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //       return cb(err, user);
  //     });
  //   }
  // ));
