import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCategories } from "../store/actions/categoryActions";
import Loader from "../components/Loader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
  width: 60%;
  max-width: 900px;
`;

const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.1px);
  padding: 1rem;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Title = styled.h3`
  text-align: center;
`;

const HomePage = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { user } = userState;

  const categoriesState = useSelector((state) => state.categories);
  const { loading, error, categories } = categoriesState;

  const history = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if (user) {
      dispatch(getCategories());
    } else {
      history("/login");
    }
  }, [history, user, redirect, dispatch]);

  return (
    <Container>
      {loading === "loading" ? (
        <Loader text="Fetching Categories" />
      ) : error ? (
        <>
          <h1>{error.message}</h1>
        </>
      ) : (
        <Grid>
          {categories.map((category) => (
            <LinkStyled key={category.id} to={`/category/${category.id}`}>
              <Card>
                <Title>{category.name}</Title>
              </Card>
            </LinkStyled>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
