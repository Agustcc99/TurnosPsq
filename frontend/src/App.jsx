import { useEffect, useState } from "react";
import { api } from "./services/api";
import LoginForm from "./components/LoginForm.jsx";
import TurnosLayout from "./components/TurnosLayout.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await api.getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setCargando(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (username, password) => {
    const data = await api.login(username, password);
    setUser(data.user);
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
  };

  if (cargando) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <TurnosLayout user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
