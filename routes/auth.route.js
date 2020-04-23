const router = require('express').Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//   res.render('login', {user: req.user})
// });
router.get('/profile', (req, res) => {
  res.render('profile', {user: req.user})
});

router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profile/');
});

module.exports = router;