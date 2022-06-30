import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getWordDetails } from "../store/actions/wordActions";
import Loader from "../components/Loader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 60px;
  padding-bottom: 40px;
`;

const Wrapper = styled.div`
  width: 60%;
  max-width: 900px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > h5 {
    margin-right: 10px;
  }
`;

const Word = () => {
  const { catId, id } = useParams();

  const dispatch = useDispatch();

  const wordState = useSelector((state) => state.wordDetails);
  const { loading, error, word } = wordState;

  useEffect(() => {
    dispatch(getWordDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Link className="btn btn-dark my-3" to={`/category/${catId}`}>
        Go Back
      </Link>
      {loading === "loading" ? (
        <Loader text="Fetching Details" />
      ) : word ? (
        <Wrapper>
          <Row>
            <h5>Name:</h5>
            <h1>{word.name}</h1>
          </Row>
          <Row>
            <h5>Tags:</h5>
            {word.tags.length === 0 ? (
              <p>No Tags...</p>
            ) : (
              <React.Fragment>
                {word.tags.map((tag) => (
                  <p>{tag}</p>
                ))}
              </React.Fragment>
            )}
          </Row>
        </Wrapper>
      ) : (
        <Loader text="Loading..." />
      )}
    </Container>
  );
};

export default Word;
