{/* <a>https://accounts.google.com/signin/oauth/error?authError=Cg5kZWxldGVkX2NsaWVudBIdVGhlIE9BdXRoIGNsaWVudCB3YXMgZGVsZXRlZC4gkQM%3D&flowName=GeneralOAuthFlow&client_id=594555697613-frlbih3lo0j312qeab8om357glb6l7ft.apps.googleusercontent.com</a> */}

const code = new URLSearchParams(location.search).get("code");
const clientId =
  "594555697613-frlbih3lo0j312qeab8om357glb6l7ft.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:5500";

if (code) {
  fetchIdToken();
}                    

async function fetchIdToken() {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log("Error occurred");
    console.log(data);
    return;
  }

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
}
