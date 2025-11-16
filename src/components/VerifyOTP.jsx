import React, { useState } from "react";

export default function VerifyOTP({ onVerified }) {
  const [codigo, setCodigo] = useState("");

  const continuar = () => {
    localStorage.setItem("codigoOTP", codigo);
    onVerified();
  };

  return (
    <div>
      <h2>Ingresa el código</h2>
      <input 
        placeholder="Código de 6 dígitos"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={continuar}>Continuar</button>
    </div>
  );
}
