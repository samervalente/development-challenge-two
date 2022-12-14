import styled from "styled-components";
import Container from "../Container";

interface IThemedProps {
  active: boolean;
}

const HamburguerContainer = styled(Container)`
  background-color: #002137;
  max-width: 60px;
  max-height: 100vh;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    min-width: 100vw;
    justify-content: flex-end;
  }
`;
const NavContainer = styled(Container)`
  max-height: 100vh;
  flex-direction: column;
  gap: 20px;

  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    img {
      width: 60%;
    }

    h3 {
      color: white;
      font-size: 14px;
      margin-top: 10px;
      line-height: 20px;
      padding: 5px;
    }
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      width: 95%;
      text-decoration: none;
      color: white;
    }
  }

  @media (max-width: 600px) {
    max-width: 100%;

    header {
      align-items: center;

      img {
        width: 50%;
      }

      h3 {
        display: none;
      }
    }
  }
`;

const NavigationOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 4px;
  padding: 7px;
  ${(props: IThemedProps) => (props.active ? "background-color: #1e81b0;" : "")}

  & > *:first-child {
    color: #abdbe3;
  }

  @media (max-width: 600px) {
    height: 30px;
  }
`;

export { NavContainer, NavigationOption, HamburguerContainer };
