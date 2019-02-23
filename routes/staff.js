var express=require('express'),
    staff=require('../models/staff')
    router=express.Router({mergeParams:true});

// STAFF
router.get("/",isLoggedIn,(req, res)=>{

  staff.find({},(err, stafffound)=>{
    if (err) {
      console.log(err);
      console.log("thats your error");
    }else {
      res.render("staff/staff", {found:stafffound});

    }
  })

})

router.get("/new",isLoggedIn,(req,res)=>{
  res.render("staff/new");
})
router.post("/", (req,res)=>{
      staff.create(req.body.staff,(err, done)=>{
        if (err) {
          console.log(err);
        }else {
                    res.redirect("/staff")
        }
      })
    })
router.get("/:id",isLoggedIn, (req, res)=>{
  staff.findById(req.params.id, function(err, done){
    res.render("staff/show", {data:done})
  })
})
router.get("/:id/edit",isLoggedIn, function(req,res){
  staff.findById(req.params.id, function(err, data){
    if (err) {
      console.log(err);
    }else
      res.render("staff/edit", {data:data});
  })

})
router.put("/:id",isLoggedIn, function(req,res){
  staff.findByIdAndUpdate(req.params.id, req.body.staff, function(err, done){
    if (err) {
      console.log(err);
    }else {
      res.redirect("/staff/" + req.params.id)
    }
  })
})
router.delete("/:id",isLoggedIn, function(req,res){
  staff.findByIdAndRemove(req.params.id, function(err, deleted){
    if (err) {
      console.log(err);
    }else {
      res.redirect("/staff")
    }
  })
})
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }else {
    res.redirect('login')
  }
}
module.exports=router;
