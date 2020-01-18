const express = require('express');
const router  = express.Router();

router.get('/ourlocation', (req, res, next) => {
  res.render('ourlocation');
});

module.exports = router;
