import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://servidor-psi-two.vercel.app/usuario-base/restablecer/${token}`,
        { nuevaContraseña: password }
      );

      setMensaje("✅ Contraseña actualizada correctamente.");
      setPassword("");

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
         style={{ background: "linear-gradient(135deg, #6610f2, #007bff)" }}>
      
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">Nueva contraseña</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">Escribe tu nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Guardar contraseña"}
          </button>
        </form>

        {mensaje && (
          <div
            className={`alert mt-3 text-center ${
              mensaje.includes("✅") ? "alert-success" : "alert-danger"
            }`}
            style={{ borderRadius: "10px" }}
          >
            {mensaje}
          </div>
        )}

        <p className="text-center mt-3">
          <a href="/login" className="text-primary fw-semibold">Volver al login</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
