import styled from "styled-components";
import Container from "../../components/Container";

const StyledContainer = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  gap: 15px;

  nav {
    display: flex;
    gap: 10px;
  }

  h1 {
    font-size: 35px;
    color: #002137;
    font-weight: bold;
  }

  p {
    color: #7e7979;
  }
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  transition: all linear 0.3s;
  background-color: ${(props) => (props.primary ? "#016EA5" : "orange")};

  :hover {
    background-color: rebeccapurple;
  }
`;

const DeleteButton = styled(Button)`
  display: ${(props) => (props.selectionModel.length > 0 ? "block" : "none")};
  background-color: red;
`;

const UpdateButton = styled(Button)`
  display: ${(props) => (props.selectionModel.length === 1 ? "block" : "none")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 50%;

  div {
    display: flex;
    gap: 25px;
  }
`;

export { StyledContainer, StyledForm, Button, DeleteButton, UpdateButton };
