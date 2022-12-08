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

const DeleteButton = styled.button`
  display: ${(props) => (props.selectionModel.length > 0 ? "block" : "none")};
  background-color: red;
  color:white;
  border:none;
  padding:10px;
  border-radius: 5px;
  font-size: 14px;
  transition: all linear 0.3s;
  :hover{
    background-color: rebeccapurple;
  }
`;

export { Container, DeleteButton };
