import React from "react";

const Sns = ({ snsObj, isOwner }) => (
  <div>
    <h4>{snsObj.text}</h4>
    {isOwner && (
      <>
        <button>삭제</button>
        <button>수정</button>
      </>
    )}
  </div>
);

export default Sns;
