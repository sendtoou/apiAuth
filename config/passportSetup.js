const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const LineStrategy = require('passport-line');
const User = require('../models/user.model');

require('dotenv').config();

//send userid in db to store in cookie on website
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//receive cookie from website to fine userid in db
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  //passport config
  callbackURL: '/auth/google/redirect',
  clientID: process.env.GG_CLIENT_ID,
  clientSecret: process.env.GG_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
  //passport callback function
    // console.log('passport google callback function got call');
    // console.log(profile);
    //check if user already exists in db
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        //already have the user in db
        console.log('user is:', currentUser);
        done(null, currentUser); // call next state to serializeUser
      }else {
        // if not, create in db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser); // call next state to serializeUser
        });
      }
    })
    
  })
)

passport.use(new FacebookStrategy({
  //passport config
  callbackURL: '/auth/facebook/redirect',
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  profileFields: ['id', 'displayName', 'photos', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    // console.log('passport facebook callback function got call');
    // console.log(accessToken)
    // console.log(profile)
    // check if user already exists in db
    User.findOne({facebookId: profile.id}).then((currentUser) => {
      if(currentUser){
        //already have the user in db
        console.log('user is:', currentUser);
        done(null, currentUser); // call next state to serializeUser
      }else {
        // if not, create in db
        new User({
          displayName: profile.displayName,
          facebookId: profile.id,
          email: profile.emails[0].value,
          picture: profile.photos[0].value
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser); // call next state to serializeUser
        });
      }
    })
  })
)

passport.use(new LineStrategy({
  channelID: process.env.LI_CHANNEL_ID,
  channelSecret: process.env.LI_CHANNEL_SERECT,
  callbackURL: '/auth/line/redirect',
  scope: ['profile', 'openid', 'email'],
  botPrompt: 'normal'
}, (accessToken, refreshToken, params, profile, done) => {
console.log('passport line callback function got call');
    console.log(accessToken)
    console.log(profile)
    User.findOne({lineId: profile.id}).then((currentUser) => {
      if(currentUser){
        //already have the user in db
        console.log('user is:', currentUser);
        done(null, currentUser); // call next state to serializeUser
      }else {
        // if not, create in db
        new User({
          displayName: profile.displayName,
          lineId: profile.id,
          email: profile.email,
          picture: profile.pictureUrl
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser); // call next state to serializeUser
        });
      }
    })
}));
