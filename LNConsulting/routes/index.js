const express = require('express');
const mongoose = require('mongoose')
const router  = express.Router();
const Project = require('../models/project.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/youraccount', (req, res, next) => {
  const userId=req.user._id;
  if (!req.user) {
    res.render('authentication/login',{accountErrorMessage: 'Please log in to see your account'});
    return;
    }


  Project.find({
    "company_id":{
      $in:[
        mongoose.Types.ObjectId(userId)
      ]
    }
  }).then(function(projects){
    console.log("My projects in the database are",projects)
    res.render('youraccount', {
      projects:projects,
      username: req.user.username
    });
  }).catch( err => console.error(err));

});

router.get('/youraccount/:id',function(req,res,next){
  Project.findById({_id:req.params.id})
  .then(function(project){

    project.comments.forEach(comment => {
      const d = comment.created_at;

      const day = d.getDate();
      var month = d.getMonth()+1;
      if (month<10) {
        month=`0${month}`;
      }
      const year = d.getFullYear()

      comment.created_at2 = `${day}-${month}-${year}`
    })

    res.render("projectdetail", {
      project: project,
      costEstimate: project.status==="Cost Estimate",
      started: project.status==="Started",
      interview: project.status==="Interview",
      development: project.status==="Development",
      delivered: project.status==="Delivered",
      username: req.user.username,
    })
  }).catch(err => console.error(err))
  
})

router.post('/youraccount/:id', function (req, res, next) {
  if (!req.user) return next(new Error('You must be logged to create a comment'));

  const id = req.params.id;

  Project.update({ _id: id }, { $push: { comments: {content:req.body.comments}}})
    .then(project => {
      res.redirect(`/youraccount/${id}`);
    })
    .catch(next)
  ;
})

module.exports = router;
