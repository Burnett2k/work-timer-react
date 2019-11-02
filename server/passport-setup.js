const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/api/auth/google/redirect',
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((e) => {
            done(new Error(`Failed to deserialize an user. ${e}`));
        });
});
