import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import WordsPage from "./pages/WordsPage";
import Word from "./pages/Word";
import EditUser from "./pages/EditUser";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const userLogin = useSelector((state) => state.user);
  const { user } = userLogin;
  return (
    <Router>
      {user && <Header />}
      <main>
        <Container fluid className="m-0 p-0">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/user/edit" element={<EditUser />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/category/:id" element={<WordsPage />}></Route>
            <Route path="/category/:catId/word/:id" element={<Word />}></Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
