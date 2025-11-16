import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const recuperar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await axios.post("https://servidor-psi-two.vercel.app/usuario-base/recuperar", {
        email
      });

      localStorage.setItem("emailReset", email);

      setMensaje("Código enviado. Revisa tu correo.");
      window.location.href = "/verify-otp";

    } catch (error) {
      setMensaje("Error al enviar el código");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Recuperar contraseña</h2>

      <form onSubmit={recuperar}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo registrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-primary w-100">Enviar código</button>
      </form>

      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}
