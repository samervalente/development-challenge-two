import styled from "styled-components";
import Container from "../../components/Container";
import Button from "../../components/Button";

const StyledContainer = styled(Container)`
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

  nav {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .delete-options {
    background-color: red;
  }
`;

const DeleteButton = styled(Button)`
  width: 25%;
  display: ${(props) => (props.selectionModel?.length > 0 ? "block" : "none")};
`;

const UpdateButton = styled(Button)`
  display: ${(props) =>
    props.selectionModel?.length === 1 ? "block" : "none"};
`;

export { StyledContainer, DeleteButton, UpdateButton };
