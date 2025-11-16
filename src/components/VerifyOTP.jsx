import { useState } from "react";
import axios from "axios";

export default function VerifyOTP() {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const verificar = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailReset");

    try {
      await axios.post("https://servidor-psi-two.vercel.app/usuario-base/verificar-otp", {
        email,
        codigo
      });

      window.location.href = "/reset-password";

    } catch (error) {
      setMensaje("Código incorrecto o expirado.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Verificar código</h2>

      <form onSubmit={verificar}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Código recibido"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <button className="btn btn-primary w-100">Verificar</button>
      </form>

      {mensaje && <p className="mt-3 text-danger">{mensaje}</p>}
    </div>
  );
}
