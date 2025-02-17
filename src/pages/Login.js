import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.intDataMessage[0].credentials);
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error al iniciar sesión, revise su contraseña o usuario");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
}

export default Login;
