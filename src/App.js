import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
