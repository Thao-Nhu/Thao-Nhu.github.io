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

  if (req.body.projectName === "" || req.body.projectDescription === "") {
    res.render("estimate", { errorMessage: "Please indicate your project name and few details about your project" });
    return;
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



module.exports = router;