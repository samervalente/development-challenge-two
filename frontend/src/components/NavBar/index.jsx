import { useState } from "react";
import { HamburguerContainer, NavContainer, NavigationOption } from "./styles";
import medcloudlogo from "../../assets/images/medcloudlogo.png";
import { PersonAddAlt1, PeopleAlt } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { Drawer } from "@mui/material";

export default function NavBar() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  return (
    <>
      <HamburguerContainer>
        <Hamburger
          size={25}
          toggled={isOpen}
          toggle={() => setOpen(true)}
          color={"white"}
        />
      </HamburguerContainer>

      <Drawer
        anchor={"left"}
        PaperProps={{
          sx: {
            width: "auto",
            height: "100vh",
            bgcolor: "#002137",
            pl: 2,
          },
        }}
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <NavContainer>
          <header>
            <img src={medcloudlogo} alt="medcloudLogo" />
            <h3>
              Excelência na gestão de dados <br /> de saúde
            </h3>
          </header>
          <main>
            <NavLink to="/" activeclassname="is-active">
              <NavigationOption
                active={isActive("/")}
                onClick={() => setOpen(false)}
              >
                <PeopleAlt />
                <span>Meus Pacientes</span>
              </NavigationOption>
            </NavLink>

            <NavLink to="/patients/register" activeclassname="is-active">
              <NavigationOption
                active={isActive("/patients/register")}
                onClick={() => setOpen(false)}
              >
                <PersonAddAlt1 />
                <span>Novo Paciente</span>
              </NavigationOption>
            </NavLink>
          </main>
        </NavContainer>
      </Drawer>
    </>
  );
}
