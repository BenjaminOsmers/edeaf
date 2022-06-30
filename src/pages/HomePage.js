import React, { useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { loading, error, user } = userState;

  const history = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if (user) {
      console.log(user);
    } else {
      history("/login");
    }
  }, [history, user, redirect]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      HomePage
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default HomePage;
