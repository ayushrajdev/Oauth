import { OAuth2Client } from "google-auth-library";

const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:4000/auth/google/callback";

const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");

  //fetch id token by exchanging auth code from auth server 
  const { tokens } = await client.getToken(code);

  // verify the id token 
  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  //extract the user info from token
  const userData = loginTicket.getPayload();
  console.log(userData);
  return userData;
}
