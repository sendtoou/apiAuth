const router = require('express').Router();

const authCheck = (req, res, next) =>{
  if(!req.user) {
    //if user is not login
    res.redirect('/auth/login');
  }else {
    // if logged in go to profile page
    next();
  }
};

router.get('/', (req, res) => {
  res.render('profilel', {user: req.user});
})

module.exports = router;