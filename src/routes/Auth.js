import AuthForm from "components/AuthForm";
import { authService } from "fbase";
// 파베 최신버전으로 인하여 아래처럼 임포트를 해주어야 사용할수 있다.
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authService, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      const result = await signInWithPopup(authService, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
    }
  };

  return (
    <div id="main-login-box">
      <AuthForm />
      <div className="sns-login-box">
        <button name="google" onClick={onSocialClick} className="social-button google" id="google-connect">
          Google 로그인
        </button>
        <button name="github" onClick={onSocialClick} className="social-button github" id="github-connect">
          <span>Github 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
