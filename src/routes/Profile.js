import { authService } from "fbase";
import React from "react";

const Profile = () => {
  const onLogOutClick = (e) => {
    authService.signOut();
  };
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
