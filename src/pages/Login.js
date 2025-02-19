import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Importamos Link para redirigir
import axios from "axios";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");  // Cambié 'username' a 'email'
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,  // Cambié 'username' a 'email'
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error al iniciar sesión, revise su contraseña o correo");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"  // Cambié 'text' a 'email'
          placeholder="Correo Electrónico"
          value={email}  // Cambié 'username' a 'email'
          onChange={(e) => setEmail(e.target.value)}  // Cambié 'setUsername' a 'setEmail'
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Aceptar</button>
      </form>
      
      <p>
        ¿No tienes una cuenta? 
        <Link to="/register">
          <button>Regístrate aquí</button>
        </Link>
      </p>
    </div>
  );
}

export default Login;
