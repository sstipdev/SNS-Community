import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const FormBox = styled.div`
  margin-top: 60px;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

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
      setError(error.message);
    }
  };

  // state account가 true일 경우 false로 업데이트 해준다.
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <FormBox>
      <form onSubmit={onSubmit}>
        <TextField
          style={{ margin: "500px;" }}
          className="idBox"
          id="outlined-basic"
          variant="outlined"
          onChange={onChange}
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
        />
        <TextField
          className="pwBox"
          id="outlined-basic"
          variant="outlined"
          onChange={onChange}
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
        />
        <Button id="createBtn" className="createBtn" variant="contained" type="submit">
          {newAccount ? "계정생성" : "로그인"}
        </Button>
        {error}
      </form>
      <Button id="loginBtn" className="loginBtn" variant="outlined" onClick={toggleAccount}>
        {newAccount ? "로그인" : "계정생성"}
      </Button>
    </FormBox>
  );
};

export default AuthForm;
