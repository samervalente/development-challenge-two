import styled from "styled-components";
import Container from "../../components/Container";
import Button from "../../components/Button";

type TThemedButtonProps = {
  selectionModel: string[];
};

const StyledContainer = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px 10px;
  width: 100%;
  gap: 15px;

  h1 {
    font-size: 35px;
    color: #002137;
    font-weight: bold;
  }

  p {
    color: #7e7979;
    text-align: justify;
    padding-right: 10px;
  }

  nav {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 600px) {
    gap: 10px;
    h1 {
      font-size: 25px;
    }

    nav {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const DeleteButton = styled(Button)`
  width: 25%;
  display: ${(props: TThemedButtonProps) =>
    props.selectionModel?.length > 0 ? "block" : "none"};

  @media (max-width: 600px) {
    width: 60%;
  }
`;

const UpdateButton = styled(Button)`
  display: ${(props: TThemedButtonProps) =>
    props.selectionModel?.length === 1 ? "block" : "none"};
`;

export { StyledContainer, DeleteButton, UpdateButton };
