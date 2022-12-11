import { NavContainer, NavigationOption } from "./styles";
import medcloudlogo from "../../assets/images/medcloudlogo.png";
import { PersonAddAlt1, PeopleAlt } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

export default function LeftBar() {
  const location = useLocation();

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  return (
    <NavContainer>
      <header>
        <img src={medcloudlogo} alt="medcloudLogo" />
        <h3>
          Excelência na gestão de dados <br /> de saúde
        </h3>
      </header>
      <main>
        <NavLink to="/" activeclassname="is-active">
          <NavigationOption active={isActive("/")}>
            <PeopleAlt />
            <span>Meus Pacientes</span>
          </NavigationOption>
        </NavLink>

        <NavLink to="/patients/register" activeclassname="is-active">
          <NavigationOption active={isActive("/patients/register")}>
            <PersonAddAlt1 />
            <span>Novo Paciente</span>
          </NavigationOption>
        </NavLink>
      </main>
    </NavContainer>
  );
}
