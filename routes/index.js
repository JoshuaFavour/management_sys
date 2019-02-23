var express=require('express'),
    user=require('../models/user'),
    passport=require('passport')
    router=express.Router({mergeParams:true});
// DASHBOARD
router.get('/', (req,res)=>{
  res.render('index')
})

// AUTHENTICATION
router.get('/signup', function(req,res){
  res.render('users/signup')
})
router.post('/signup', function(req,res){
  var newUser=new user({username:req.body.username});
  user.register(newUser,req.body.password,function(err,user){
    if (err) {
      console.log(err);
      return res.render('/users/signup')
    }
    passport.authenticate('local')(req,res,function(){
      res.redirect('/staff')
    })
  })
} )
router.get('/login', function(req,res){
  res.render('users/login')
})
router.post('/login', passport.authenticate('local',{
  successRedirect:'/staff',
  failureRedirect: '/login'
}),function(req,res){})

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope:['email']}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
      res.redirect('/');
  });


router.get('/logout', function(req,res){
  req.logout();

  res.redirect('/')
})

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }else {
    res.redirect('login')
  }
}
module.exports=router;
