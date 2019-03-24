const express = require('express');
const router  = express.Router();

// Login
router.get('/login', (req, res, next) => {
  res.render('login');
});

//Register
router.get('/register', (req, res, next) => {
    res.render('register');
  });

module.exports = router;
