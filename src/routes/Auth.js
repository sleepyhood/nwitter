import { authService } from "myBase";
import React, { useState } from "react";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import AuthForm from "components/AuthForm";

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
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue With Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue With Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
