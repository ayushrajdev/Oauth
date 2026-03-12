// const button = document.querySelector("button");
// const authUrl =
//   "https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5500/implict-grant-type/callback.html&nonce=123456ayush&prompt=consent";

// button.addEventListener("click", () => {
//   window.open(authUrl, "popup", "width=500");
// });

// window.addEventListener("message", (message) => {
//   console.log(message);
//   if (message.data.success) {
//     alert("done");
//   } else {
//     alert("failed");
//   }
// });

// console.log("runing index.html");

async function googleLoginCallback(response) {
  console.log(response);
}

const clientId =
  "49496056122-gtvbtjankhnq56ei05dmv01v7nsgjvvq.apps.googleusercontent.com";

// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id: clientId,
//     callback: googleLoginCallback,
//   });
//   google.accounts.id.renderButton(document.querySelector("#google-login", {
//     type:"icon"
//   }));
//   google.accounts.id.prompt();
// };

window.onload = function () {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      console.log(response);
      if (response.credential) {
        loginUserWithIdToken(response.credential);
      } else {
        console.log("Something went wrong!");
      }
    },
  });

  google.accounts.id.renderButton(document.getElementById("google-login"), {
    theme: "filled_blue",
    shape: "pill",
  });
  google.accounts.id.prompt();  //this will show the one tap login 
};

async function loginUserWithIdToken(idToken) {
  const baseURL = "http://localhost:4000";
  const response = await fetch(`${baseURL}/auth/google`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (response.status === 200) {
    // location.href = "/";
  }
}

//in implicit grant type the id token is sent to the client without the need of exchanging the code for token and there is no need of client secret in this flow and the token is sent to the client in the url hash and the client can extract the token from the url hash and then send it to the server for verification and then the server can create a session for the user and send the session id to the client and then the client can use the session id to access the protected resources

// GSI and fedcm help to achieve the implict grant type to login the user

// Gsi is reponsible for verifying the user and then sending the id token

//fedcm is the browser API that helps to achieve the implict grant type and it uses the browser native popup to login the user

// in this flow the id token is sent to the client and then the client will send the id token to the server and then the server will verify the token and then it will extract the user details and create the user session and send the user session id to the user and the control over the user is also is handled by the server
