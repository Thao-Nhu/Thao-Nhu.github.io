const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/youraccount', (req, res, next) => {
  res.render('youraccount');
});

module.exports = router;
