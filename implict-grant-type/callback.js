const idToken = new URLSearchParams(window.location.hash.substring(1)).get(
  "id_token",
);
console.log(idToken);
if (idToken) {
  async function fetchToken() {
    try {
      //send the idToken to server and then server will verify the token and then it will extract the user details and create the user session and send the user session id to the user and the control over the user is also is handled by the server
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        body: JSON.stringify(idToken),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        window.opener.postMessage({ success: true });
      } else {
        window.opener.postMessage({ success: false });
      }
      window.close();
    } catch (error) {
      window.close();
      window.opener.postMessage({ success: false });
    }
  }
  fetchToken();
} else {
  window.close();
  window.opener.postMessage({ success: false });
}
