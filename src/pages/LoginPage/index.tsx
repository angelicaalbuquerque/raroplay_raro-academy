import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { FormTitle } from "../../components/FormTitle";
import { HeaderForm } from "../../components/HeaderForm";
import iconOffHidePassword from "../../assets/icons/elements/senha-exibir.svg";
import iconOnHidePassword from "../../assets/icons/elements/senha-esconder.svg";
import { useState } from "react";
import apiClient from "../../services/api-client";
import "./LoginPage.css";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const hidePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const autenticaUsuario = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const url = `/auth/login`;
      const response = await apiClient.post(url, { email, senha });

      const { access_token, id, nome, foto } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", id);

        // store user data
        const userDataToJson = JSON.stringify({ nome, foto });
        localStorage.setItem("user_data", userDataToJson);

        navigate("/");
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        setErro("Usuário ou senha Inválidos");
      } else {
        setErro("Erro ao autenticar usuário. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderForm />
      <form className="containerLogin" onSubmit={autenticaUsuario}>
        <div className="loginHeader">
          <FormTitle title="Login" />
          <p>Informe seu e-mail e senha para acessar a plataforma.</p>
        </div>
        <div className="loginInputField">
          <div>
            <label>
              Usuário
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="loginInputPassword">
            <label>
              Senha
              <div className="iconHidePassword">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button onClick={hidePassword} type="button">
                  <img
                    src={
                      showPassword ? iconOffHidePassword : iconOnHidePassword
                    }
                  />
                </button>
              </div>
              <Link to="/recuperar-senha">Esqueci minha senha</Link>
            </label>
          </div>
          {erro ? <p className="error">E-mail ou senha incorretos!</p> : <></>}
          <div className="footerForm">
            <Button type="submit">
              {loading ? "Carregando..." : "Entrar"}
            </Button>
            <p className="footerText">
              Não tem uma conta? <Link to="/cadastro">Cadastre-se!</Link>
            </p>
          </div>
        </div>
      </form>
    </Container>
  );
};
