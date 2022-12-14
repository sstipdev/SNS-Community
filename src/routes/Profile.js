import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { TextField, Button } from "@mui/material";

const Profile = ({ userObj, refreshUser }) => {
  let history = useHistory();
  const [newDpName, setNewDpName] = useState(userObj.displayName);
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

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDpName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // userObj.displayName(원래닉네임) 과 newDpName(변경할 닉네임)이 서로 동일하지 않다면 true 코드 실행
    if (userObj.displayName !== newDpName) {
      await updateProfile(userObj, { displayName: newDpName });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField id="standard-basic" variant="standard" onChange={onChange} type="text" placeholder="닉네임" value={newDpName} className="nameInput" />
        <Button variant="contained" type="submit" id="changeName">
          닉네임 변경
        </Button>
      </form>
      <Button variant="outlined" color="error" onClick={onLogOutClick} id="logout">
        로그아웃
      </Button>
    </>
  );
};

export default Profile;
