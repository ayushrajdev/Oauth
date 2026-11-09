const button = document.querySelector("button");

const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const redirectUrl = "http://localhost:5500/callback.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&nonce=123&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", async ({ data }) => {
  if (data.message === "success") {
    location.href = "/";
  } else {
    const para = document.createElement("p");
    para.innerText = "Something went wrong!";
    document.body.appendChild(para);
    setTimeout(() => {
      para.remove();
    }, 2000);
  }
});
