import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";

const Profile = ({ userObj }) => {
  let history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMySns = async () => {
    // where 로 필터링을 할수있다.
    const q = query(collection(dbService, "SNS"), where("creatorId", "==", userObj.uid), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMySns();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
