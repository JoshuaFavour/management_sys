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
    face=require('./models/face'),




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
seed();

// DASHBOARD
app.get('/', (req,res)=>{
  res.render('index')
})
// STAFF
app.get("/staff",isLoggedIn,(req, res)=>{

  staff.find({},(err, stafffound)=>{
    if (err) {
      console.log(err);
      console.log("thats your error");
    }else {
      res.render("staff/staff", {found:stafffound});

    }
  })

})
app.get
app.get("/staff/new",isLoggedIn,(req,res)=>{
  res.render("staff/new");
})
app.post("/staff", (req,res)=>{
      staff.create(req.body.staff,(err, done)=>{
        if (err) {
          console.log(err);
        }else {
                    res.redirect("/staff")
        }
      })
    })
app.get("/staff/:id",isLoggedIn, (req, res)=>{
  staff.findById(req.params.id, function(err, done){
    res.render("staff/show", {data:done})
  })
})
app.get("/staff/:id/edit",isLoggedIn, function(req,res){
  staff.findById(req.params.id, function(err, data){
    if (err) {
      console.log(err);
    }else
      res.render("staff/edit", {data:data});
  })

})
app.put("/staff/:id",isLoggedIn, function(req,res){
  staff.findByIdAndUpdate(req.params.id, req.body.staff, function(err, done){
    if (err) {
      console.log(err);
    }else {
      res.redirect("/staff/" + req.params.id)
    }
  })
})
app.delete("/staff/:id",isLoggedIn, function(req,res){
  staff.findByIdAndRemove(req.params.id, function(err, deleted){
    if (err) {
      console.log(err);
    }else {
      res.redirect("/staff")
    }
  })
})
// ANNOUNCEMENTS
app.get("/announcements", function(req,res){
  ann.find({}, function(err, ann){
    if (err) {
      console.log(err);
    }else {
        res.render("announce/index", {ann:ann})
    }
  })
})
app.get('/announcements/new', function(req,res){
  res.render('announce/new')
})
app.get('/announcements/:id', function(req,res){
  ann.findById(req.params.id, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.render('announce/show', {ann:ann})
    }
  })
})

app.post('/announcements', function(req,res){
  ann.create(req.body.ann, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.redirect('/announcements')
    }
  })
})
app.get('/announcements/:id/edit', function(req,res){
  ann.findById(req.params.id, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.render('announce/edit', {ann:ann})
    }
  })
})
app.put('/announcements/:id', function(req,res){
  ann.findByIdAndUpdate(req.params.id,req.body.ann, function(err, done){
    if (err) {
      console.log(err);
    }else {
      res.redirect('/announcements/' + req.params.id)
    }
  })
})
app.delete('/announcements/:id', function(req,res){
  ann.findByIdAndRemove(req.params.id,function(err){
    if (err) {
      console.log(err);
      return res.redirect('/announcements/' + req.params.id)
    }
    else {
      return res.redirect('/announcements')
    }
  })
})
// AUTHENTICATION
// app.get('/signup', function(req,res){
//   res.render('users/signup')
// })
// app.post('/signup', function(req,res){
//   var newUser=new user({username:req.body.username});
//   user.register(newUser,req.body.password,function(err,user){
//     if (err) {
//       console.log(err);
//       return res.render('/users/signup')
//     }
//     passport.authenticate('local')(req,res,function(){
//       res.redirect('/staff')
//     })
//   })
// } )
// app.get('/login', function(req,res){
//   res.render('users/login')
// })
// app.post('/login', passport.authenticate('local',{
//   successRedirect:'/staff',
//   failureRedirect: '/login'
// }),function(req,res){})
//
// app.get('/auth/facebook',
//   passport.authenticate('facebook', {scope:['email']}));
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//       res.redirect('/');
//   });
//
//
// app.get('/logout', function(req,res){
//   req.logout();
//
//   res.redirect('/')
// })

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }else {
    res.redirect('login')
  }
}

app.listen(3000, function(){
  console.log("initialized");
})
