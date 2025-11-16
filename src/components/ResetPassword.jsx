import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (pass !== confirm) {
      return setMensaje("Las contraseñas no coinciden.");
    }

    const email = localStorage.getItem("emailRecuperacion");
    const codigo = localStorage.getItem("codigoRecuperacion");

    if (!email || !codigo) return setMensaje("Error interno.");

    // 🔐 AES 128
    const clave = CryptoJS.enc.Utf8.parse("1234567890123456");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
    const encrypted = CryptoJS.AES.encrypt(pass, clave, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();

    try {
      await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/verificar-otp",
        {
          email,
          codigo,
          nuevaContraseña: encrypted, // ← se manda cifrada
        }
      );

      // Limpiar temporales
      localStorage.removeItem("emailRecuperacion");
      localStorage.removeItem("codigoRecuperacion");

      navigate("/");
    } catch (error) {
      setMensaje("Error actualizando la contraseña.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Nueva contraseña</h3>

        <form onSubmit={handleReset}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Nueva contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Actualizar</button>
        </form>

        {mensaje && <p className="mt-3 text-danger text-center">{mensaje}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
