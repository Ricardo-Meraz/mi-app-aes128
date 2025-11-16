import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarCodigo = async () => {
    try {
      const res = await axios.post("https://servidor-psi-two.vercel.app/usuario-base/recuperar", { email });
      setMensaje("Código enviado. Revisa tu correo.");
      localStorage.setItem("emailRecuperacion", email);
    } catch (e) {
      setMensaje("Error al enviar código.");
    }
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <input 
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={enviarCodigo}>Enviar código</button>
      <p>{mensaje}</p>
    </div>
  );
}
