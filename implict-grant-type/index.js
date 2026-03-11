const button = document.querySelector("button");
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5500/implict-grant-type/callback.html&nonce=123456ayush&prompt=consent";

button.addEventListener("click", () => {
  window.open(authUrl, "popup", "width=500");
});

window.addEventListener("message", (message) => {
  console.log(message);
  if (message.data.success) {
    alert("done");
  } else {
    alert("failed");
  }
});

console.log("runing index.html");
