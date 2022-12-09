import { NavContainer, NavigationOption } from "./styles";
import medcloudlogo from "../../assets/images/medcloudlogo.png";
import { PersonAddAlt1, PeopleAlt } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

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
        <Link to="/" exact activeClassName="is-active">
          <NavigationOption active={isActive("/")}>
            <PeopleAlt />
            <span>Meus Pacientes</span>
          </NavigationOption>
        </Link>

        <Link to="/patients/register" activeClassName="is-active">
          <NavigationOption active={isActive("/patients/register")}>
            <PersonAddAlt1 />
            <span>Novo Paciente</span>
          </NavigationOption>
        </Link>
      </main>
    </NavContainer>
  );
}
