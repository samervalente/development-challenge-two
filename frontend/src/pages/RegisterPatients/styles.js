import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px 20px;
  max-width: 100vw;
  gap: 15px;
  line-height: 40px;

  h1 {
    font-size: 35px;
    color: #002137;
    font-weight: bold;
  }

  p {
    color: #7e7979;
  }

  @media (max-width: 600px) {
    gap: 0px;

    h1{
      font-size:25px;
    }
  }
`;

export { Container };
