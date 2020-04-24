const router = require('express').Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//   res.render('login', {user: req.user})
// });
router.get('/profile', (req, res) => {
  res.render('profile', {user: req.user})
});

router.get('/profilef', (req, res) => {
  res.render('profilef', {user: req.user})
});

router.get('/profilel', (req, res) => {
  res.render('profilel', {user: req.user})
});

router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profile/');
});

router.get('/facebook', passport.authenticate('facebook', {}));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profilef/');
});

router.get('/line', passport.authenticate('line', {
  scope:['profile', 'openid', 'email']
}));
router.get('/line/redirect', passport.authenticate('line'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profilel/');
});





module.exports = router;