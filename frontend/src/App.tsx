import React from "react";
import "./styles/reset.css";
import "./styles/global.css";
import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import MyPatients from "./pages/MyPatients";
import RegisterPatients from "./pages/RegisterPatients";

function App() {
  return (
    <>
      <Container>
        <ToastContainer />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<MyPatients />} />
            <Route path="/patients/register" element={<RegisterPatients />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export default App;
