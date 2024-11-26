const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    req.session.username = user.username;
    req.session.role = user.role;

    res.redirect('/dashboard');
  } catch (err) {
    res.render('login', { error: 'An error occurred, please try again' });
  }
});


router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password} = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'All fields are required' });
  }

  try {
    const user = new User({ username, password});
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: 'Error creating user, try again' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});


module.exports = router;
