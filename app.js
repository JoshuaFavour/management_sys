var express=require('express'),
    bodyParser=require('body-parser'),
    app=express(),
    mongoose= require('mongoose'),
    staff=require('./models/staff.js'),
    seed=require('./seed.js'),
    methodOverride=require("method-override"),
    ann=require('./models/ann.js')
    expressSession=require('express-session'),
    localStrategy=require('passport-local'),
    passport=require('passport'),
    user=require('./models/user'),
    FacebookStrategy=require('passport-facebook').Strategy,
    face=require('./models/face')

var staffRoutes=require('./routes/staff'),
    indexRoutes=require('./routes/index'),
    annRoutes  =require('./routes/announce')




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27020/church_db", { useNewUrlParser: true });
app.use(express.static(__dirname + ("/public")))

app.use(expressSession({
  secret:"joshua",
  resave: false,
  saveUninitialized:false
}));


app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
    clientID: face.facebookAuth.clientID,
    clientSecret: face.facebookAuth.clientSecret,
    callbackURL: face.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(()=>{
      user.findOrCreate({'facebook.id':profile.id}, function(err, user){
        if(err)
        return done(err)
        if(user)
        return done(null, user)
        else{
          var newFUser= new user();
          newFUser.facebook.id=profile.id;
          newFUser.facebook.token=accessToken;
          newFUser.facebook.name=profile.name.givenName + '' + profile.name.familyName;
          newFUser.facebook.email=profile.emails[0].value;

          newFUser.save(function(err){
            if(err){
              console.log(err);
            }

            return done(null, newFUser)
          })
        }
      })
    })
  }));
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  next();
})
app.use('/staff', staffRoutes);
app.use(indexRoutes);
app.use('/announcements', annRoutes);
seed();


app.listen(3000, function(){
  console.log("initialized");
})
