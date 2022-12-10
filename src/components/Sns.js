import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Sns = ({ snsObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSns, setNewSns] = useState(snsObj.text);
  const onDeleteClick = async () => {
    // window.confirm > 브라우저상의 alret창을 커스텀 메세지로 추력할수 있고 , 예 아니요를 통해 true or false를 반환할수 있다.
    const ok = window.confirm("해당 글을 삭제하실 건가요?");
    if (ok) {
      // snsObj.id를 정보를 얻어 sns 글들을 삭제할수 있음
      const snsTextInfo = doc(dbService, "SNS", `${snsObj.id}`);
      // delete sns
      await deleteDoc(snsTextInfo);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(snsObj, newSns);
    const snsTextInfo = doc(dbService, "SNS", `${snsObj.id}`);
    await updateDoc(snsTextInfo, {
      text: newSns,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewSns(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="수정할 내용을 기입하세요." value={newSns} required onChange={onChange} />
            <input type="submit" value="업데이트" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{snsObj.text}</h4>
          {/* Home.js 의 fileUrl true 일 경우 snsObj.fileUrl width와 height의 값을 조정 src 값또한 부여해야함 */}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sns;
