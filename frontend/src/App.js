import "./styles/reset.css";
import "./styles/global.css";
import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LeftBar from "./components/LeftBar";
import MyPatients from "./pages/MyPatients";
import RegisterPatients from "./pages/RegisterPatients";

function App() {
  return (
    <>
      <Container>
        <ToastContainer />
        <BrowserRouter>
          <LeftBar />
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
`;

export default App;
