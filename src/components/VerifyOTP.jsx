import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email_recuperacion");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/verificar-otp",
        { email, codigo }
      );

      if (response.data.mensaje) {
        // 🔥 SI EL CÓDIGO ES CORRECTO → IR A /reset
        navigate("/reset");
      }

    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje || "Código incorrecto. Intenta otra vez."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Verificar código</h3>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>Código recibido</label>
            <input
              type="text"
              className="form-control"
              placeholder="123456"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Verificar</button>
        </form>

        {mensaje && (
          <div className="alert alert-danger text-center mt-3">{mensaje}</div>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
