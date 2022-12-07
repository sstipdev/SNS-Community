import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [sns, setSns] = useState("");
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
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={sns} onChange={onChange} type="text" placeholder="할말을 적어주세요" maxLength={120} />
        <input type="submit" value="게시" />
      </form>
    </div>
  );
};
export default Home;
