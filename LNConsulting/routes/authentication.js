const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const Project = require('../models/project.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//const uploadCloud = require('../config/cloudinary.js');

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const nb_of_employees = req.body.nb_of_employees;

  // 1. Check username,password,email and nbofemployees are not empty
  if (username === "" || password === "" || email === "" || nb_of_employees === "") {
    res.render("authentication/signup", { errorMessage: "Please indicate username, password, email and number of employees" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", { errorMessage: "The username already exists" });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        username,
        password: hashPass,
        email,
        nb_of_employees
      });

      newUser.save()
        .then(user => {
          // save user in session: req.user
          req.login(user, err => {
            if (err) return next(err); // Session save went bad

            res.redirect('/'); // All good, we are now logged in and `req.user` is now set
          });
        })
        .catch(err => next(err))
      ;
        
    })
    .catch(err => next(err))
  ;
});

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('youraccount');
  } else {
    res.render('authentication/login', { message: req.flash('error')});
  } 
  //console.log('errormessage',req.flash('error'))
});

router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }
  
    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render('authentication/login', {errorMessage: 'Wrong or non-existing password or username'}); 
      return;
    }

    // save user in session: req.user
    req.login(theUser, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      Project.find()
        .then((projects) => {
          res.redirect('youraccount')
        })
        .catch(err => next(err))
      
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.render('authentication/logout');
});

module.exports = router;
