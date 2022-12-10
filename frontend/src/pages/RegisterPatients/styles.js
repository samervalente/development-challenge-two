import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  gap: 15px;

  h1 {
    font-size: 35px;
    color: #002137;
    font-weight: bold;
  }

  p {
    color: #7e7979;
  }

  
`;

const RegisterButton = styled.button`
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  transition: all linear 0.3s;
  background-color: #016ea5;
  margin-top: 15px;

  :hover {
    filter: brightness(80%);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 50%;

  input {
    width: 150px;
  }

  div {
    display: flex;
    gap: 25px;
  }
`;

export { Container, StyledForm, RegisterButton };
