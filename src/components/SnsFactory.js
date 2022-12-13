import { dbService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";

const SnsFacktory = ({ userObj }) => {
  const [sns, setSns] = useState("");
  const [file, setFile] = useState("");
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

  const onFileChange = (e) => {
    // file의 로그를 받고싶을때. e.target.files
    console.log(e.target.files);
    const {
      target: { files },
    } = e;
    // 파일을 첨부하는 input에 있는 모든 파일중에 첫번째 파일만 받을꺼임
    const theFile = files[0];
    // fileReader를 생성
    const reader = new FileReader();
    reader.onloadend = (finish) => {
      // 구조분해 할당으로 setFile state 변경함수에 파일 데이터 경로를 업데이트함
      const {
        currentTarget: { result },
      } = finish;
      setFile(result);
    };
    // file 용량이 1mb 이상인것들은 불러올수가 없음
    reader.readAsDataURL(theFile);
  };

  // 선택한 파일을 지우는 기능
  const clearImg = () => setFile(null);
  return (
    <form onSubmit={onSubmit}>
      <input value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="게시" />
      {file && (
        <div>
          <img src={file} width="50px" height={"50px"} />
          <button onClick={clearImg}>사진 제거</button>
        </div>
      )}
    </form>
  );
};

export default SnsFacktory;
