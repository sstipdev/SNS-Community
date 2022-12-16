import { dbService } from "fbase";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";

const SnsFacktory = ({ userObj }) => {
  const [sns, setSns] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    // 현재 firebase 버킷생성 구글오류가 계속 출력되어 이미지업로드 기능구현은 불가
    // const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    // const response = await uploadString(fileRef, file, "data_url");
    // const fileUrl = await response.ref.getDownloadURL();

    // 파이어베이스 Missing or insufficient permissions 오류가 확인되어 firstore 규칙을 변경해서 해당 오류를 해결함
    await addDoc(collection(dbService, "SNS"), {
      text: sns,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName: userObj.displayName,
      userEmail: userObj.email,
    });
    setSns("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSns(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField id="textForm-input" variant="standard" value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
      <Button id="textForm-btn" variant="outlined" type="submit">
        게시
      </Button>
    </form>
  );
};

export default SnsFacktory;
