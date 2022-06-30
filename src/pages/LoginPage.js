import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/actions/userActions";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../components/FormContainer";
import Container from "../components/Container";
import Heading from "../components/Heading";

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

    if (error && error.message) {
      toast.warn(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [history, user, redirect, error]);

  const submithandler = (values) => {
    dispatch(login(values));
  };

  return (
    <Container>
      <ToastContainer />
      {loading === "loading" ? (
        <Loader text="Submitting Data" />
      ) : (
        <FormContainer>
          <Heading>
            <h2>Welcome to,</h2>
            <h1>eDeaf</h1>
            <p>Enter your details below to log in.</p>
          </Heading>
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
        </FormContainer>
      )}
    </Container>
  );
};

export default LoginPage;
