import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/userActions";
import Loader from "../components/Loader";
import { Formik, Field, Form } from "formik";

const EditUser = () => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);
  const { loading, error, user } = userDetails;

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
  };

  return (
    <div>
      {loading === "loading" ? (
        <Loader text="Fetching Profile" />
      ) : updateLoading === "loading" ? (
        <Loader text="Updating Profile" />
      ) : (
        <Formik
          initialValues={{
            name: user.name,
            surname: user.lastName,
            email: user.email,
          }}
          onSubmit={(values) => submitHandler(values)}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="Name" />

            <label htmlFor="surname">Surname</label>
            <Field id="surname" name="surname" placeholder="Surname" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="email address"
              type="email"
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default EditUser;
