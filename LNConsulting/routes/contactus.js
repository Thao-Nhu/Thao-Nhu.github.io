const express = require('express');
const router  = express.Router();

router.get('/contactus', (req, res, next) => {
  res.render('contactus');
});

module.exports = router;
