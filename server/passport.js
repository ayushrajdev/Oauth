import passport, { session } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

//? passport js can might be slow than the google auth library as passport js uses the access token to call the user endpoint to get the user info but the google auth library gives the user info in the id token itself but it do the extra call to verify the token but it cache it for sometime 



const clientId =
  "49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com";

const clientSecret = "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";
const redirectUrl = "http://localhost:5500/callback.html";

//setting up google client
passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: redirectUrl,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid "],
    prompt: "consent",
  }),
);

//by default the passportjs uses the express-session
app.get(
  "/auth/google/callback",

  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  async function (req, res) {
    // // Successful authentication, redirect home.
    // res.redirect("/");

    const userData = req.profile._json;

    //! user,session are mongoose model but not implemented this is only a pseudo code to show the flow of the application and how the session is created and stored in the database and how the cookie is set in the browser
    let user, session;
    user = await User.find({
      email: userData.email,
    });

    if (!user) {
      user = await User.create({
        email: userData.email,
      });
    }

    const previousSession = await Session.find({
      userId: user.id,
    });

    if (previousSession) {
      await previousSession.deleteOne();
    }

    session = new Session({
      email,
      createdAt: Date.now(),
    });

    session.save();
    res.cookie("sid", session.id, {
      expires: 3600,
      httpOnly: true,
    });
    res.redirect(`http://localhost:5500/callback.html?sid=${sid}`);

    return res.end();
  },
);
