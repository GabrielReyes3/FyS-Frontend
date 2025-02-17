import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';


function Home() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60); // Contador de 1 minuto
  const [tokenExpired, setTokenExpired] = useState(false);

  // Función para verificar si el token está expirado
  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token JWT
      const expTime = decodedToken.exp * 1000; // Convertir a milisegundos
      return Date.now() > expTime;
    }
    return true;
  };

  useEffect(() => {
    // Verificar si el token ha expirado cuando el componente se monta
    if (isTokenExpired()) {
      alert("La sesión ha expirado");
      localStorage.removeItem("token");
      navigate("/");
    } else {
      // Si el token no ha expirado, configurar el contador
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTokenExpired(true);
            alert("La sesión ha expirado");
            localStorage.removeItem("token");
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Tiempo restante: {countdown} segundos</p>
      {tokenExpired && <p>La sesión ha expirado. Redirigiendo...</p>}
      <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>Cerrar sesión</button>
    </div>
  );
}

export default Home;
