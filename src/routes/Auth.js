import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="email" type="text" placeholder="이메일" required value={email} />
        <input onChange={onChange} name="password" type="password" placeholder="비밀번호" required value={password} />
        <input type="submit" value="로그인" />
      </form>
      <div>
        <button>Google 로그인</button>
        <button>Gitgub 로그인</button>
      </div>
    </div>
  );
};

export default Auth;
