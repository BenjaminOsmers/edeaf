import React, { useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCategories,
  getCategoryWords,
} from "../store/actions/categoryActions";
import Loader from "../components/Loader";
import Card from "../components/Card";

const HomePage = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { user } = userState;

  const categoriesState = useSelector((state) => state.categories);
  const { loading, error, categories } = categoriesState;

  const categoryWordState = useSelector((state) => state.categoryWords);
  const { loading: wordsLoading, error: wordsError, words } = categoryWordState;

  const history = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(getCategories());
    } else {
      history("/login");
    }
  }, [history, user, redirect, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const viewWords = (id) => {
    dispatch(getCategoryWords(id));
  };

  return (
    <div>
      {loading === "loading" ? (
        <Loader text="Fetching Categories" />
      ) : error ? (
        <>
          <h1>Error</h1>
        </>
      ) : (
        <>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          ))}
          <Button onClick={logoutHandler}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
