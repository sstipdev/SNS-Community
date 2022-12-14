import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 300px;
  margin: 100px 0 20px 0;
`;

const UlList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  list-style: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 17px;
  color: grey;
  font-weight: bold;
`;

const Navigation = ({ userObj }) => {
  return (
    <Nav>
      <UlList>
        <li>
          <StyledLink to="/">홈</StyledLink>
        </li>
        <li>
          {/* props로 userObj 의 객체의 정보를 받아 유저 닉네임을 출력한다. */}
          <StyledLink to="/profile" style={{ textDecoration: "none" }}>
            {userObj.displayName} 님의 프로필
          </StyledLink>
        </li>
      </UlList>
    </Nav>
  );
};

export default Navigation;
