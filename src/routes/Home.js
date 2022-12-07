import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  const [sns, setSns] = useState("");
  const [info, setInfo] = useState([]);
  const getInfo = async () => {
    const q = query(collection(dbService, "SNS"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const snsObj = {
        ...doc.data(),
        id: doc.id,
      };
      setInfo((prev) => [snsObj, ...prev]);
    });
  };
  useEffect(() => {
    getInfo();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    // 파이어베이스 Missing or insufficient permissions 오류가 확인되어 firstore 규칙을 변경해서 해당 오류를 해결함
    await addDoc(collection(dbService, "SNS"), {
      sns,
      createdAt: Date.now(),
    });
    setSns("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSns(value);
  };
  console.log(info);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
        <input type="submit" value="게시" />
      </form>
      <div>
        {info.map((data) => (
          <div key={data.id}>
            <h4>{data.sns}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
