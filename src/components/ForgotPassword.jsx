import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/recuperar",
        { email }
      );

      // ✔ Guardar email temporal
      localStorage.setItem("emailRecuperacion", email);

      navigate("/verify");
    } catch (error) {
      setMensaje("Error enviando el código. Verifica tu correo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Recuperar contraseña</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo registrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Enviar código</button>
        </form>

        {mensaje && <p className="mt-3 text-danger text-center">{mensaje}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
