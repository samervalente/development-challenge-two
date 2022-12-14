import React from "react";
import { useState } from "react";
import { HamburguerContainer, NavContainer, NavigationOption } from "./styles";
import medcloudlogo from "../../assets/images/medcloudlogo.png";
import { PersonAddAlt1, PeopleAlt } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { Drawer } from "@mui/material";

export default function NavBar() {
  const location = useLocation();
  const [isOpen, setOpen] = useState<boolean>(false);

  function isActive(buttonPath: string) {
    return location.pathname === buttonPath;
  }

  function closeDrawer() {
    setOpen(false);
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
            p: "10px 10px",
          },
        }}
        open={isOpen}
        onClose={closeDrawer}
      >
        <NavContainer>
          <header>
            <img src={medcloudlogo} alt="medcloudLogo" />
            <h3>
              Excelência na gestão de dados <br /> de saúde
            </h3>
          </header>
          <main>
            <NavLink to="/" className="is-active">
              <NavigationOption active={isActive("/")} onClick={closeDrawer}>
                <PeopleAlt />
                <span>Meus Pacientes</span>
              </NavigationOption>
            </NavLink>

            <NavLink to="/patients/register" className="is-active">
              <NavigationOption
                active={isActive("/patients/register")}
                onClick={closeDrawer}
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
