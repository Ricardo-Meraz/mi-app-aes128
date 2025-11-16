import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/recuperar",
        { email }
      );

      localStorage.setItem("email_recuperacion", email);

      setMensaje("Código enviado a tu correo.");

      // 🔥 REDIRIGE AUTOMÁTICAMENTE A LA PANTALLA PARA METER EL CÓDIGO
      setTimeout(() => navigate("/verify"), 800);

    } catch (error) {
      setMensaje("Error al enviar código.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Recuperar contraseña</h3>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Enviar código</button>
        </form>

        {mensaje && (
          <div className="alert alert-info text-center mt-3">{mensaje}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
