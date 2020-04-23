const express = require('express');
const authRoutes = require('./routes/auth.route');
const profileRoutes = require('./routes/profile.route');
const profilefRoutes = require('./routes/profilef.route');
const passportSetup = require('./config/passportSetup');
const conn = require('./config/conn')
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000, // 1 day
  keys: [process.env.COOKIE_KEY]
}));

//initalize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/profilef', profilefRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user })
});

const port = process.env.PORT || 5000
app.listen(port)
console.log('Server listening on port:' + port)