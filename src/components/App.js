import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import styled from "styled-components";
import { Switch } from "@mui/material";

const Appbox = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
`;

const DescText = styled.p`
  font-size: 18px;
  margin: 40px 0 0px 0;
`;

function App() {
  const [init, setInit] = useState(false);
  const [newName, setNewName] = useState("");
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [color, setColor] = useState("white");
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // user Login > State userObj 빈값일경우 false 로 반환되고, 빈값이 아닐경우 true로 반환되기에 Login을 체크할수 있음
        setUserObj(user);
        if (user.displayName === null) {
          user.displayName = "닉네임을 수정해주세요";
        }
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setNewName(user.displayName);
  };

  const changeColor = () => {
    color === "white" ? setColor("black") : setColor("white");
  };

  return (
    <Appbox style={{ backgroundColor: color }}>
      <Switch defaultChecked id="ColorChangeBtn" onClick={changeColor} />
      <DescText>커뮤니티</DescText>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "정보를 불러오는중..."}
      <footer>&copy; {new Date().getFullYear()} sstipdev All rights reserved.</footer>
    </Appbox>
  );
}

export default App;
