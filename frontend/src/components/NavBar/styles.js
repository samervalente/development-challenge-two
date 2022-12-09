import styled from "styled-components";
import Container from "../Container";

const NavContainer = styled(Container)`
  background-color: #002137;
  max-width: 250px;
  max-height: 100vh;
  flex-direction: column;
  padding-left: 10px;
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

  div {
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const NavigationOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 4px;
  padding: 7px;
  ${(props) => (props.active ? "background-color: #1e81b0;" : "")}

  & > *:first-child {
    color: #abdbe3;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;

export { NavContainer, NavigationOption };
