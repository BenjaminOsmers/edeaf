import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/actions/userActions";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  max-width: 500px;
  padding: 2.5rem 3rem;
  border-radius: 1.5rem;

  background: rgba(255, 255, 255, 0.48);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.1px);
  -webkit-backdrop-filter: blur(14.1px);
  border: 1px solid rgba(255, 255, 255, 1);
`;

const FormStyled = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FieldStyled = styled(Field)`
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(241, 241, 241, 0.8);
  border: 0.5px solid ${(props) => (props.error ? "red" : "#fff")};
  margin: 8px 0;

  &:focus {
    border: 0.5px solid #ca61d7;
    outline: 1.5px solid #ca61d7;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LabelStyled = styled.label`
  padding-left: 5px;
  margin: 0;
`;

const Heading = styled.div`
  font-family: "Poppins", sans-serif;
  margin-bottom: 0.8em;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > h1 {
    line-height: 1em;
    font-size: 28px;
  }

  & > h2 {
    color: #999;
    font-weight: 400;
    font-size: 18px;
  }

  & > p {
    font-size: 13px;
    color: #555;
    margin-top: 0.8em;
  }

  @media (min-width: 768px) {
    & > h1 {
      font-size: 54px;
    }

    & > h2 {
      font-size: 30px;
    }

    & > p {
      font-size: 25px;
    }
  }

  @media (min-width: 1024px) {
    & > h1 {
      font-size: 50px;
    }

    & > p {
      font-size: 20px;
    }
  }
`;

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
        <Loader text="Logging In..." />
      ) : (
        <FormContainer>
          <Heading>
            <h2>Welcome to,</h2>
            <h1>eDeaf</h1>
            <p>Enter your details below to log your current height.</p>
          </Heading>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => submithandler(values)}
          >
            <FormStyled>
              <FormGroup>
                <LabelStyled htmlFor="username">Username</LabelStyled>
                <FieldStyled
                  id="username"
                  name="username"
                  placeholder="email address"
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <LabelStyled htmlFor="password">Password</LabelStyled>
                <FieldStyled
                  id="password"
                  name="password"
                  placeholder="***"
                  type="password"
                />
              </FormGroup>
              <Button type="submit" className="mt-3 w-100" variant="primary">
                Submit
              </Button>
            </FormStyled>
          </Formik>
        </FormContainer>
      )}
    </Container>
  );
};

export default LoginPage;
