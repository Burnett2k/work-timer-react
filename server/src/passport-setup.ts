import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { User } from './models/user';

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        googleId: profile.id,
      });

      if (currentUser) {
        done(null, currentUser);
        return;
      }

      const newUser = new User({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        screenName: profile.displayName,
        googleId: profile.id,
        emailAddress: profile.emails[0].value,
      });
      newUser.save();
      if (newUser) {
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error(`Failed to deserialize an user. ${e}`));
    });
});
