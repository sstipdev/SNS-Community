import React, { useState } from "react";
import AppRouter from "./Router";
import { authSErvice } from "fbase";

function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(authSErvice.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} sstipdev All rights reserved.</footer>
    </>
  );
}

export default App;
