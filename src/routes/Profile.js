import { authService } from "fbase";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  let history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
