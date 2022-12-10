import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [newName, setNewName] = useState("");
  // eslint-disable-next-line
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // user Login > State userObj 빈값일경우 false 로 반환되고, 빈값이 아닐경우 true로 반환되기에 Login을 체크할수 있음
        setUserObj(user);
        if (user.displayName === null) {
          user.displayName = "닉네임을 수정해주세요";
        }
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setNewName(user.displayName);

    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    // });

    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    // });
  };
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "정보를 불러오는중..."}
      <footer>&copy; {new Date().getFullYear()} sstipdev All rights reserved.</footer>
    </>
  );
}

export default App;
