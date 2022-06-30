import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getWordDetails } from "../store/actions/wordActions";
import Loader from "../components/Loader";

const Word = () => {
  const { catId, id } = useParams();

  const dispatch = useDispatch();

  const wordState = useSelector((state) => state.wordDetails);
  const { loading, error, word } = wordState;

  useEffect(() => {
    dispatch(getWordDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link className="btn btn-dark my-3" to={`/category/${catId}`}>
        Go Back
      </Link>
      {loading === "loading" ? (
        <Loader text="Fetching Details" />
      ) : (
        <h1>{word.name}</h1>
      )}
    </div>
  );
};

export default Word;
