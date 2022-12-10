import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import Sns from "components/Sns";

const Home = ({ userObj }) => {
  const [sns, setSns] = useState("");
  const [info, setInfo] = useState([]);
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
    <div>
      <form onSubmit={onSubmit}>
        <input value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
        <input type="submit" value="게시" />
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
