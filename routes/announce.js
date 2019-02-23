var express=require('express'),
    ann= require('../models/ann')
    router=express.Router({mergeParams:true});

// ANNOUNCEMENTS
router.get("/", function(req,res){
  ann.find({}, function(err, ann){
    if (err) {
      console.log(err);
    }else {
        res.render("announce/index", {ann:ann})
    }
  })
})
router.get('/new', function(req,res){
  res.render('announce/new')
})
router.get('/:id', function(req,res){
  ann.findById(req.params.id, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.render('announce/show', {ann:ann})
    }
  })
})

router.post('/', function(req,res){
  ann.create(req.body.ann, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.redirect('/announcements')
    }
  })
})
router.get('/:id/edit', function(req,res){
  ann.findById(req.params.id, function(err, ann){
    if (err) {
      console.log(err);
    }else {
      res.render('announce/edit', {ann:ann})
    }
  })
})
router.put('/:id', function(req,res){
  ann.findByIdAndUpdate(req.params.id,req.body.ann, function(err, done){
    if (err) {
      console.log(err);
    }else {
      res.redirect('/announcements/' + req.params.id)
    }
  })
})
router.delete('/:id', function(req,res){
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
module.exports=router;
