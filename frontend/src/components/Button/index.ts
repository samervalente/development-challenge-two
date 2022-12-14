import styled from "styled-components";

type TButtonProps  = {
  variant?: string
}

const Button = styled.button`
  color: white;
  border: none;
  width: 20%;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  transition: all linear 0.3s;
  background-color: ${(props: TButtonProps) => {
    switch (props.variant) {
      case "secondary":
        return "#002E82";
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

  @media (max-width: 600px) {
    width: 60%;
  }
`;

export default Button;
