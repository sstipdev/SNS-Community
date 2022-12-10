import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString } from "@firebase/storage";
import { storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import Sns from "components/Sns";

const Home = ({ userObj }) => {
  const [sns, setSns] = useState("");
  const [info, setInfo] = useState([]);
  const [file, setFile] = useState();
  //   const getInfo = async () => {
  //     const q = query(collection(dbService, "SNS"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const snsObj = {
  //         ...doc.data(),
  //         id: doc.id,
  //       };
  //       setInfo((prev) => [snsObj, ...prev]);
  //     });
  //   };

  useEffect(() => {
    // 실시간으로 데이터를 firebase 데이터베이스에서 가져오기
    const q = query(collection(dbService, "SNS"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const snsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInfo(snsArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, file, "data_url");
    console.log(response);
    // 파이어베이스 Missing or insufficient permissions 오류가 확인되어 firstore 규칙을 변경해서 해당 오류를 해결함
    // await addDoc(collection(dbService, "SNS"), {
    //   text: sns,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    //   userName: userObj.displayName,
    //   userEmail: userObj.email,
    // });
    // setSns("");
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
    <div>
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
      <div>
        {info.map((data) => (
          <Sns key={data.id} snsObj={data} isOwner={data.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
