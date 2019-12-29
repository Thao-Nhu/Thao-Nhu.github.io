const express = require('express');
const router  = express.Router();
const Project = require('../models/project.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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
