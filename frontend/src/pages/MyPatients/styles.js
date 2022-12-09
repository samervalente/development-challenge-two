import styled from "styled-components";

const Container = styled.div`
  display: flex;
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




export { Container, Button, DeleteButton, UpdateButton };
