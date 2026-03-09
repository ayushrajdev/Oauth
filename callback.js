// if (window.name == "auth-window") {
//   let code = new URLSearchParams(location.search).get("code");
//   if (code) {
//     console.log(window.opener)
//     console.log(window.opener.name)
//     console.log(code)
//     window.opener.postMessage({ code });
// window.close();
//   }
// }

let sid = new URLSearchParams(location.search).get("sid");
if (sid) {
  const response = await fetch(
    `http://localhost:3000/session-cookie?sid=${sid}`,
    {
      credentials: "include",
    },
  );
  if (response.status == 200) {
    window.opener.postMessage({ success: true });
    window.close();
  }
}
