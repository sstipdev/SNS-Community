import React, { useState } from "react";

const Home = () => {
  const [sns, setSns] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
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
