const express = require('express');
const router  = express.Router();

/* GET internal control */
router.get('/internalControl', (req, res, next) => {
  res.render('internalControl');
});

/* GET power bi */
router.get('/powerBI', (req, res, next) => {
  res.render('powerBI');
});

/* GET training */
router.get('/training', (req, res, next) => {
  res.render('training');
});

module.exports = router;
