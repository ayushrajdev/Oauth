import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";

function App() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  return (
    <>
      <GoogleLogin // based on gsi library and follow implicit grant type flow
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        shape="pill"
        theme="filled_blue"
        type="icon"
        onError={() => {
          console.log("Login Failed");
        }}
      />

      <button onClick={() => login()}>Login with Google</button>
    </>
  );
}

export default App;
