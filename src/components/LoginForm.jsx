import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoJS from "crypto-js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      // 🔐 Cifrar la contraseña igual que en el registro
      const clave = CryptoJS.enc.Utf8.parse("1234567890123456");
      const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

      const encrypted = CryptoJS.AES.encrypt(password, clave, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();

      // 📤 Enviar al backend usando tu nueva API
      const response = await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/login",
        {
          email,
          contraseña: encrypted, // 👈 IMPORTANTE
        }
      );

      setMensaje(response.data.mensaje || "✅ Inicio de sesión exitoso.");

      // Guardar datos si quieres
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("❌ Error en login:", error);
      setMensaje(
        error.response?.data?.mensaje ||
          "❌ Error al iniciar sesión. Verifica tus datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ background: "linear-gradient(135deg, #6610f2, #007bff)" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Iniciar sesión
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{
              background: "#007bff",
              border: "none",
              borderRadius: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        {mensaje && (
          <div
            className={`alert mt-3 text-center ${
              mensaje.includes("✅") ? "alert-success" : "alert-danger"
            }`}
            style={{ borderRadius: "10px" }}
          >
            {mensaje}
          </div>
        )}

        <p className="text-center mt-3 mb-0" style={{ color: "#555" }}>
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-primary fw-semibold">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
