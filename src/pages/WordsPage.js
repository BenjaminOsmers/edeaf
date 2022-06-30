import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryWords } from "../store/actions/categoryActions";

const WordsPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const categoryWordState = useSelector((state) => state.categoryWords);
  const { loading: wordsLoading, error: wordsError, words } = categoryWordState;

  useEffect(() => {
    dispatch(getCategoryWords(id));
  }, [dispatch, id]);

  return (
    <div>
      {words.map((word) => (
        <Link key={word.id} to={`/category/${id}/word/${word.id}`}>
          <h1>{word.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default WordsPage;
