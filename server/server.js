import express from "express";
import cookieParser from "cookieParser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  }),
);

const clientId =
  "49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com";

const clientSecret = "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";
const redirectUrl = "http://localhost:5500/callback.html";

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

app.post("/auth/google", async (req, res) => {
  console.log(req);
  res.redirect(authUrl);
  res.end();
});

app.get("/auth/token", async (req, res) => {
  const sid = req.cookies.sid;
  const existingSession = await Session.findById(sid);
  if (existingSession) {
    return res.json({ message: "already loggedin" });
  }

  const { code } = req.query;
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));

  //! user,session are mongoose model but not implemented this is only a pseudo code
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
});

app.get("/session-cookie", async (req, res) => {
  const { sid } = req.query;
  res.cookie("sid", JSON.stringify(sid), {
    expires: 36000,
  });
  res.end();
});

app.get("/auth/profile", async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await Session.findById(sid);
  if (!session || !sid) {
    return res.redirect("http://localhost:5500/login.html");
  }

  const user = await User.findById(session.userId);
  if (!user) {
    return res.redirect("http://localhost:5500/login.html");
  }
  return res.json(user);
});

app.post("/auth/logout", async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await Session.findById(sid);
  if (!sid || !session) {
    return res.json({ message: "please login" });
  }
  session.deleteOne();
  res.clearCookie("sid");

  return res.json({ message: "user deleted" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
