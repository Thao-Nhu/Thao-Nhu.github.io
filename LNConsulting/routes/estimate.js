const express = require('express');
const router  = express.Router();
const Project = require('../models/project.js');



router.get('/estimate', (req, res, next) => {
  if (!req.user) {
    res.render('authentication/login',{estimateErrorMessage: 'Please log in to get an estimate'});
    return;
  }
  res.render('estimate');
});

router.post('/estimate', function (req, res, next) {
  if (!req.user) {
    return next(new Error('You must be logged to request an estimate'));
  }

  Project.create({
    project_name: req.body.projectName,
    project_description: req.body.projectDescription,
    company_id: req.user.id,
    status:"Cost Estimate"
  })
    .then( project => {
      res.redirect("/youraccount")
    })
    .catch(next);
});

router.get('/youraccount', (req, res, next) => {
  if (!req.user) {
    res.render('authentication/login',{accountErrorMessage: 'Please log in to see your account'});
    return;
  }

  Project.find().then(function(projects){
    console.log("My projects in the database are",projects)
    res.render('youraccount', {
      projects:projects,
      username: req.user.username
    });
  }).catch( err => console.error(err));
  

});

module.exports = router;