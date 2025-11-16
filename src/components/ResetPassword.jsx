import React, { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cambiar = async () => {
    const email = localStorage.getItem("emailRecuperacion");
    const codigo = localStorage.getItem("codigoOTP");

    try {
      await axios.post("https://servidor-psi-two.vercel.app/usuario-base/verificar-otp", {
        email,
        codigo,
        nuevaContraseña: password
      });

      setMensaje("Contraseña actualizada correctamente");

    } catch (e) {
      setMensaje("Error al actualizar contraseña");
    }
  };

  return (
    <div>
      <h2>Nueva contraseña</h2>
      <input 
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={cambiar}>Cambiar</button>
      <p>{mensaje}</p>
    </div>
  );
}
