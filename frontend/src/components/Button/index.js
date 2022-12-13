import styled from "styled-components";

const Button = styled.button`
  color: white;
  border: none;
  width: 20%;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  transition: all linear 0.3s;
  background-color: ${(props) => {
    switch (props.variant) {
      case "secondary":
        return "orange";
      case "disabled":
        return "gray";
      case "delete":
        return "red";
      default:
        return "#016EA5";
    }
  }};
  margin-top: 15px;

  :hover {
    filter: brightness(80%);
  }
`;

export default Button;
