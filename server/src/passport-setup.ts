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

      if (!currentUser) {
        const newUser = await new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          screenName: profile.displayName,
          googleId: profile.id,
          emailAddress: profile.emails[0].value,
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, currentUser);
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
