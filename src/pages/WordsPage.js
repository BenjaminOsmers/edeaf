import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WordsPage = () => {
  const { id } = useParams();
  const history = useNavigate();

  return <div>{id}</div>;
};

export default WordsPage;
