import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';  // Asegúrate de crear un archivo CSS para el estilo

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  // Puede ser 'user', 'admin', etc.
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Validar que todos los campos estén completos
      if (!email || !username || !password || !role) {
        alert("Todos los campos son obligatorios");
        return;
      }

      // Enviar los datos al backend
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        username,
        password,
        role,
      });

      // Verificar si el registro fue exitoso
      if (response.status === 201) {
        alert("Usuario registrado exitosamente");
        navigate("/");  // Redirige a la página de login
      } else {
        alert("Hubo un problema con el registro");
      }
    } catch (error) {
      alert("Error al registrar, intente nuevamente");
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
