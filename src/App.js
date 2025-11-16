import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

// 🔵 Importar los nuevos componentes
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Registro */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Recuperar contraseña */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Restablecer contraseña */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
