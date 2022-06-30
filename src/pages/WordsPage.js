import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryWords } from "../store/actions/categoryActions";
import styled from "styled-components";
import Loader from "../components/Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 70px;
  padding-bottom: 40px;
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

const BackButton = styled(Link)`
  text-decoration: none;
  color: #000;
  width: 80%;
  text-align: left;
`;

const WordsPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const categoryWordState = useSelector((state) => state.categoryWords);
  const { loading: wordsLoading, error: wordsError, words } = categoryWordState;

  useEffect(() => {
    if (!words) {
      dispatch(getCategoryWords(id));
    }
  }, [dispatch, id, words]);

  return (
    <Container>
      <BackButton to="/">Go Back</BackButton>
      {wordsLoading === "loading" ? (
        <Loader text="Loading..." />
      ) : (
        <React.Fragment>
          <h1>{words ? words.name : ""}</h1>
          <Grid>
            {words &&
              words.words.map((word) => (
                <LinkStyled
                  key={word.id}
                  to={`/category/${id}/word/${word.id}`}
                >
                  <Card>
                    <Title>{word.name.toUpperCase()}</Title>
                  </Card>
                </LinkStyled>
              ))}
          </Grid>
        </React.Fragment>
      )}
    </Container>
  );
};

export default WordsPage;
