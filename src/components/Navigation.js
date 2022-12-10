import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          {/* props로 userObj 의 객체의 정보를 받아 유저 닉네임을 출력한다. */}
          <Link to="/profile">{userObj.displayName} 님의 프로필</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
