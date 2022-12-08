import { Container } from "./styles";
import medcloudlogo from "../../assets/images/medcloudlogo.png";
import { PersonAddAlt1, PeopleAlt } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function LeftBar() {
  return (
    <Container>
      <header>
        <img src={medcloudlogo} alt="medcloudLogo" />
        <h3>Excelência na gestão de dados de saúde</h3>
      </header>
      <main>
        <NavLink to="/" exact activeClassName="is-active">
          <div className="test">
            <PeopleAlt />
            <span>Meus Pacientes</span>
          </div>
        </NavLink>

        <NavLink to="/patients/register" activeClassName="is-active">
          <div>
            <PersonAddAlt1 />
            <span>Cadastrar Paciente</span>
          </div>
        </NavLink>
      </main>
    </Container>
  );
}
