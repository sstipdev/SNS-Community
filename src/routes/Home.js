import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Sns from "components/Sns";
import SnsFacktory from "components/SnsFactory";

const Home = ({ userObj }) => {
  const [info, setInfo] = useState([]);

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

  return (
    <div className="textFrom">
      <SnsFacktory userObj={userObj} />
      <div className="textinfo">
        {info.map((data) => (
          <Sns key={data.id} snsObj={data} isOwner={data.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
