import { authService } from "myBase";
import React from "react";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import AuthForm from "components/AuthForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
// 다음과 같이 정의를 해두면 자동import가 됨
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    const auth = getAuth();
    // const providerGoogle = new GoogleAuthProvider();
    // const providerGithub = new GithubAuthProvider();
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(authService, provider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(authService, provider);
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      }

      // const data = await signInWithPopup(provider);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authContainer">
      <span className="logos">
        {/* <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDBDMTE0LjgzNywwLDAsMTE0LjgzNywwLDI1NnMxMTQuODM3LDI1NiwyNTYsMjU2czI1Ni0xMTQuODM3LDI1Ni0yNTZTMzk3LjE2MywwLDI1NiwweiBNMjU2LDQ5MC42NjcNCgkJCWMtMTI5LjM4NywwLTIzNC42NjctMTA1LjI4LTIzNC42NjctMjM0LjY2N1MxMjYuNjEzLDIxLjMzMywyNTYsMjEuMzMzUzQ5MC42NjcsMTI2LjYxMyw0OTAuNjY3LDI1NlMzODUuMzg3LDQ5MC42NjcsMjU2LDQ5MC42Njd6DQoJCQkiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /> */}
        <span className="circle">○</span>
        <span className="triangle">△</span>
        <span className="rectangle">□</span>
      </span>
      {/* <span className="ment">"게임에 참가를 원하십니까?"</span> */}

      <div className="authForm">
        <AuthForm />
        <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
            Google <FontAwesomeIcon icon={faGoogle} />
          </button>{" "}
          <button onClick={onSocialClick} name="github" className="authBtn">
            Github <FontAwesomeIcon icon={faGithub} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
