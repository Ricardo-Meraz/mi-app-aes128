import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://servidor-psi-two.vercel.app/usuario-base/recuperar",
        { email }
      );

      setMensaje("📩 Revisa tu correo para restablecer tu contraseña.");
      setEmail("");

    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
         style={{ background: "linear-gradient(135deg, #007bff, #6610f2)" }}>
      
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">Recuperar contraseña</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar correo"}
          </button>
        </form>

        {mensaje && (
          <div
            className={`alert mt-3 text-center ${
              mensaje.includes("📩") ? "alert-success" : "alert-danger"
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

export default ForgotPassword;
