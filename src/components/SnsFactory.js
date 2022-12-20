import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const SnsFacktory = ({ userObj }) => {
  const [sns, setSns] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = "";
    if (attachment != "") {
      // 현재 firebase 버킷생성 구글오류가 계속 출력되어 이미지업로드 기능구현은 불가
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      fileUrl = await getDownloadURL(ref(storageService, fileRef));
      // 파이어베이스 Missing or insufficient permissions 오류가 확인되어 firstore 규칙을 변경해서 해당 오류를 해결함
    }
    const snsObj = {
      text: sns,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName: userObj.displayName,
      userEmail: userObj.email,
      fileUrl,
    };
    await addDoc(collection(dbService, "SNS"), snsObj);
    setSns("");
    setAttachment("");
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    // 파일을 갖음
    const theFile = files[0];
    // reader 를 생성
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      return setAttachment(result);
    };
    // readAsDataURL을 사용해서 파일을 읽음
    reader.readAsDataURL(theFile);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSns(value);
  };

  const onClearPhoto = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <TextField id="textForm-input" variant="standard" value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <Button id="textForm-btn" variant="outlined" type="submit">
        게시
      </Button>
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" /> <button onClick={onClearPhoto}>사진제거</button>
        </div>
      )}
    </form>
  );
};

export default SnsFacktory;
