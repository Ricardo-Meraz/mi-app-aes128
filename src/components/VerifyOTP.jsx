import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setMensaje("");

    const email = localStorage.getItem("emailRecuperacion");

    if (!email) {
      return setMensaje("Error interno. Solicita el código otra vez.");
    }

    try {
      // ✔ Guardar el código temporal también
      localStorage.setItem("codigoRecuperacion", codigo);

      // Primero solo verificamos si el código es válido
      const res = await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/verificar-otp",
        { email, codigo, validarSolo: true }
      );

      navigate("/reset-password");
    } catch (error) {
      setMensaje("Código incorrecto o expirado.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Verificar código</h3>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Código recibido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100">Verificar</button>
        </form>

        {mensaje && <p className="mt-3 text-danger text-center">{mensaje}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;
