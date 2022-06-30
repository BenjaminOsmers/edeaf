import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/actions/userActions";
import Loader from "../components/Loader";

// login: admin@codehesion.co.za

// password: P@ssword1

const LoginPage = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { loading, error, user } = userState;

  const history = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      history(`${redirect}`);
    }
  }, [history, user, redirect]);

  const submithandler = (values) => {
    dispatch(login(values));
  };

  return (
    <div>
      {loading === "loading" ? (
        <Loader text="Submitting Data" />
      ) : (
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => submithandler(values)}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              placeholder="email address"
              type="email"
            />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="***" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default LoginPage;
