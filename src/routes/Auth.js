import { authService } from "fbase";
// 파베 최신버전으로 인하여 아래처럼 임포트를 해주어야 사용할수 있다.
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  // 비구조화 할당을 통해서 사용자가 입력한 name값이 일치한지 확인한다.
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      // 일치하면 state 함수를 통해 사용자가 입력한 value 값을 저장한다.
      setEmail(value);
    } else if (name === "password") {
      // 일치하면 state 함수를 통해 사용자가 입력한 value 값을 저장한다.
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // 계정 생성
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="email" type="email" placeholder="이메일" required value={email} />
        <input onChange={onChange} name="password" type="password" placeholder="비밀번호" required value={password} />
        <input type="submit" value={newAccount ? "계정생성" : "로그인"} />
      </form>
      <div>
        <button>Google 로그인</button>
        <button>Gitgub 로그인</button>
      </div>
    </div>
  );
};

export default Auth;
