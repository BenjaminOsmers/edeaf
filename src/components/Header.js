import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";

const NavBar = styled.div`
  z-index: 200;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 100px;
  position: fixed;
  top: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled(Button)`
  margin-right: 20px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Header = () => {
  const dispatch = useDispatch();

  const history = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <NavBar>
      <LinkStyled to="/">
        <h1>eDeaf</h1>
      </LinkStyled>
      <div>
        <EditButton onClick={() => history("/user/edit")}>
          Edit profile
        </EditButton>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </NavBar>
  );
};

export default Header;
