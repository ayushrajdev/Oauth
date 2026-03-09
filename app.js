// let code =
//   "4/0AfrIepBSbjvSS0yPM3mbuml03Yynftsz1apJDqOAY-AnQWrI1MqHQiwKmLEN22BHW_16tQ";
// const client_id =
//   "49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com";

// const client_secret = "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";
// const redirect_uri = "http://localhost:5500";

// code = new URLSearchParams(location.search).get("code");
// const payload = new URLSearchParams({
//   code,
//   client_id: client_id,
//   client_secret: client_secret,
//   redirect_uri: redirect_uri,
//   grant_type: "authorization_code",
// });
// console.log(code);
// if (code) {
//   // fetchIdToken();
// }

// async function fetchIdToken() {
//   const response = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: payload,
//   });

//   const data = await response.json();
//   console.log(data);
// }

// const res = {
//     "access_token": "ya29.a0ATkoCc5dtn1Qt6KCuSaDo_7TuyKrbB8SDFTXMMFbs8n_A_yuMRwzlTitczfrHPy8lL1uy2flEkclkNR59bqm5MEL_vQVe1uKU7mZYB7mqEX6MJM9XccADodAggfkCv4ggPnwrlqKvaxBTHrxoT8lUN2zoCAFUoIo6TmsdlAcaESK-sG2PTQe383SigvM7CkKjDU_YlgaCgYKAXkSARUSFQHGX2MipKbqWG-xfgRKWnqyQ4fTug0206",
//     "expires_in": 3599,
//     "scope": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//     "token_type": "Bearer",
//     "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MDdmNTFhZjJhMTYyNDY3MDc0ODQ2NzRhNDJhZTNjMmI2MjMxOWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTQ5NjA1NjEyMi1ndHZidGphbmtobnE1NmVpMDVkbXYwMXY3bnNnanZ2cS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5NDk2MDU2MTIyLWd0dmJ0amFua2hucTU2ZWkwNWRtdjAxdjduc2dqdnZxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3MjA5MDYxNzA2NzYzNDU4MDcyIiwiZW1haWwiOiJheXVzaHJhajI0ODJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ1ZjNZMVNsNlFwemVyQVV3d1I5SGdnIiwibmFtZSI6IkF5dXNoIFJhaiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKVjRnUjdvV1Jvd18tSVppdjR6MEoyTlYwUm42TkUtSkFIV3hYVGpmdGRvamdWc3c9czk2LWMiLCJnaXZlbl9uYW1lIjoiQXl1c2giLCJmYW1pbHlfbmFtZSI6IlJhaiIsImlhdCI6MTc3MjYwOTMyMiwiZXhwIjoxNzcyNjEyOTIyfQ.AMLBIXfFV1PP7HR8DRF6buS4smElA0Bb0Is-c9SFXQn3w5eTNjaa6X3Y7KzkPrc1EO8VjMwB2myEqZrtQmGqKFJXNywy1xie_6OWqqYUW_tlehLz_K--HxzEd_sXxQ8oM8Ubyk9r_YxR0WUTQZixTzmuvUcyEtFOienhLorzuKHXLvh7CJT67ovSMRkAIxxOYqYxygrwDMb_s47aJfdctcR1Bmj1z9POsj2vqGrbU6GE_vW9UFPZevItJY8EL_87r_IFf_-K77MUyg_KLRzF8xxh0t693Jo4dwxIbXPun97P51P0tlkDq96-xzxWOEIz9X1JgO7qV09DP9Xp29eq0w"
// }

// console.log(res.id_token)

// const idToken = res.id_token;

// const payloadJwt = idToken.split(".")[1]

// const json = atob(payloadJwt)

// const data = JSON.parse(json)
// console.log(data)

const button = document.querySelector("button");

// this is parent window and it listen to the message sent by the child window
window.addEventListener("message", (event) => {
  console.log(event);
});


button.addEventListener("click", () => {
  window.open(
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com&redirect_uri=http://localhost:5500&response_type=code&scope=openid%20email%20profile",
    "auth-window",
    "width=500,height=600",
  );
});

if (window.name == "auth-window") {
  //? this send the message to the parent window or tab
  // window.opener.postMessage("hi")

  let code = new URLSearchParams(location.search).get("code");
  console.log({code})
  if (code) {
    console.log(code)
    window.opener.postMessage({code});
    // window.close();
  }
}


