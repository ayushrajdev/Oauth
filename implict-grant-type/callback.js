const idToken = new URLSearchParams(window.location.hash.substring(1)).get(
  "id_token",
);
console.log(idToken);
if (idToken) {
  async function fetchToken() {
    try {
      const response = await fetch("http://localhost:3000/token-details", {
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
        window.opener.postMessage({success:false});
    }
  } 
  fetchToken();
}
