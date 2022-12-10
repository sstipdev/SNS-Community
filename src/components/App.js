import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // user Login > State userObj 빈값일경우 false 로 반환되고, 빈값이 아닐경우 true로 반환되기에 Login을 체크할수 있음
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "정보를 불러오는중..."}
      <footer>&copy; {new Date().getFullYear()} sstipdev All rights reserved.</footer>
    </>
  );
}

export default App;
