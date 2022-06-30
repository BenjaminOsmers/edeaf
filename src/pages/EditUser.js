import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, setUser } from "../store/actions/userActions";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 100px;
  padding-bottom: 40px;
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

const EditUser = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);
  const { loading, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdate);
  const { loading: updateLoading } = userUpdateProfile;

  const history = useNavigate();

  useEffect(() => {
    if (!user) {
      history("/login");
    }
  }, [history, user, updateLoading, dispatch]);

  const submitHandler = (values) => {
    // console.log(values);
    dispatch(
      updateUser({
        name: values.name,
        surname: values.surname,
        email: values.email,
      })
    );

    if (updateLoading === "success") {
      dispatch(
        setUser({
          name: values.name,
          surname: values.surname,
          email: values.email,
        })
      );
    }
  };

  return (
    <Container>
      {loading === "loading" ? (
        <Loader text="Fetching Profile" />
      ) : updateLoading === "loading" ? (
        <Loader text="Updating Profile" />
      ) : (
        <FormContainer>
          <Heading>
            <h1>Edit Profile</h1>
          </Heading>
          <Formik
            initialValues={{
              name: user ? user.name : "",
              surname: user ? user.lastName : "",
              email: user ? user.email : "",
            }}
            onSubmit={(values) => submitHandler(values)}
          >
            <FormStyled>
              <FormGroup>
                <LabelStyled htmlFor="name">Name</LabelStyled>
                <FieldStyled id="name" name="name" placeholder="Name" />
              </FormGroup>

              <FormGroup>
                <LabelStyled htmlFor="surname">Surname</LabelStyled>
                <FieldStyled
                  id="surname"
                  name="surname"
                  placeholder="Surname"
                />
              </FormGroup>

              <FormGroup>
                <LabelStyled htmlFor="email">Email</LabelStyled>
                <FieldStyled
                  id="email"
                  name="email"
                  placeholder="email address"
                  type="email"
                />
              </FormGroup>

              <Button type="submit">Submit</Button>
            </FormStyled>
          </Formik>
        </FormContainer>
      )}
    </Container>
  );
};

export default EditUser;
