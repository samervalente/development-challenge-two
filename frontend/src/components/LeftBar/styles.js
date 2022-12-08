import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 20%;
  background-color: #002137;
  padding: 10px;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    a {
      width: 90%;
      text-decoration: none;
      color: white;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all linear 0.3s;
    border-radius: 6px;

    padding: 10px;

    :hover {
      background-color: white;
      color: #002137;
    }
  }

  h3 {
    font-size: 14px;
    margin-top: 10px;
  }

  img {
    width: 60%;
  }
`;

export { Container };
