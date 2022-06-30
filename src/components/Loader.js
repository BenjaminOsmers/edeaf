import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  background: rgba(255, 255, 255, 0.48);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.1px);
  -webkit-backdrop-filter: blur(14.1px);
  border: 1px solid rgba(255, 255, 255, 1);
`;

const Title = styled.h1`
  margin-top: 1rem;
`;

const Loader = ({ text }) => {
  return (
    <LoaderContainer>
      <GridLoader />
      <Title>{text}</Title>
    </LoaderContainer>
  );
};

export default Loader;
