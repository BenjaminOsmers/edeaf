import styled from "styled-components";

export default styled.div`
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
