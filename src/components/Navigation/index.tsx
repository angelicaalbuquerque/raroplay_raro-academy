import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticated } from "../../components/VerifyAuth";
import "./Navigation.css";

interface IUser {
  nome: string;
  foto: string;
}

export const Navigation = ({ buscarVideos }: any) => {
  const [user, setUser] = useState<IUser>({ nome: "", foto: "" });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticated();

  useEffect(() => {
    const userData = localStorage.getItem("user_data");

    if (userData !== null) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    localStorage.removeItem("user_data");
    navigate(0);
    buscarVideos();
  }

  if (!isAuthenticated) {
    return (
      <>
        <Link className="btn" to="/login">
          Login
        </Link>
        <Link className="btn register" to="/cadastro">
          Cadastre-se
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="navigation">
        <div className="user">
          <div>
            <img src={user.foto} alt={`Foto de perfil de ${user.foto}`} />
          </div>
          <p>{user.nome}</p>
        </div>
        <div className="divider" />
        <Link className="btn" type="button" to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    </>
  );
};

export default Navigation;
