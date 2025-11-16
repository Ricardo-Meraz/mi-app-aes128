import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cambiar = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("emailReset");

    try {
      await axios.post("https://servidor-psi-two.vercel.app/usuario-base/restablecer-otp", {
        email,
        nuevaContraseña: password
      });

      setMensaje("Contraseña cambiada correctamente.");
      localStorage.removeItem("emailReset");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error) {
      setMensaje("Error al actualizar la contraseña");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Nueva contraseña</h2>

      <form onSubmit={cambiar}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100">Actualizar</button>
      </form>

      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}
