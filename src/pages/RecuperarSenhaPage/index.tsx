import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormTitle } from "../../components/FormTitle";
import { HeaderForm } from "../../components/HeaderForm";
import iconOffHidePassword from "../../assets/icons/elements/senha-exibir.svg";
import iconOnHidePassword from "../../assets/icons/elements/senha-esconder.svg";
import "./RecuperarSenhaPage.css";
import { useState } from "react";
import apiClient from "../../services/api-client";

export const RecuperarSenhaPage = () => {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [segundoErro, setSegundoErro] = useState("");
  const [segundaMensagem, setSegundaMensagem] = useState("");
  const [secondLoading, setSecondLoading] = useState(false);

  const getCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setEmail("");
    setSenha("");
    setNovaSenha("");
    setCodigo("");
    setLoading(true);
    setMensagem("");
    setSegundaMensagem("");
    setSegundoErro("");

    try {
      await apiClient.post(`/auth/solicitar-codigo`, { email });
      console.log("tudo certo");
      setEmail("");
      setMensagem("Código enviado com sucesso");
    } catch (error: any) {
      if (error.response.data.statusCode === 404) {
        setErro("E-mail não está cadastrado!");
      }
    }
    setLoading(false);
  };

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSegundoErro("");
    setSecondLoading(true);
    setSegundaMensagem("");
    setEmail("");
    setErro("");
    setMensagem("");

    if (senha === novaSenha) {
      try {
        await apiClient.patch(`/auth/recuperar-senha`, { codigo, novaSenha });
        console.log("Senha alterada");
        setSenha("");
        setNovaSenha("");
        setCodigo("");
        setSegundaMensagem("Senha alterada com sucesso!");
      } catch (error) {
        setSegundoErro("Código incorreto!");
      }
    } else {
      setSegundoErro("Senhas não conferem!");
    }
    setSecondLoading(false);
  };

  const hidePassword = () => {
    setShowPassword(!showPassword);
  };

  const hideNewPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  return (
    <div className="recuperarSenhaPage">
      <HeaderForm />
      <div className="containerFormForgotPassword">
        <form className="containerForgotPassword" onSubmit={getCode}>
          <div className="forgotPasswordHeader">
            <FormTitle title="Esqueci a senha" />
            <p>
              Tranquilo, digite seu e-mail e enviaremos um código para a
              recuperação de senha.
            </p>
          </div>
          <div className="forgotPasswordInputField">
            <div>
              <label>
                E-mail
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </label>
            </div>
            <div className="forgotPasswordFooter">
              <Button type="submit">
                {loading ? "Carregando..." : "Solicitar código"}
              </Button>
            </div>
            {erro ? (
              <p className="error">{erro}</p>
            ) : (
              <p className="mensagem">{mensagem}</p>
            )}
          </div>
        </form>

        <form className="containerIhaveCode" onSubmit={resetPassword}>
          <div className="iHaveCodeHeader">
            <FormTitle title="Já possuo o código" />
            <p>
              Maravilha! Insira o código de recuperação que enviamos por e-mail
              e crie sua nova senha.
            </p>
          </div>
          <div className="iHaveCodeInputField">
            <div>
              <label>
                Código
                <input
                  type="text"
                  onChange={(e) => setCodigo(e.target.value)}
                  value={codigo}
                  required
                />
              </label>
            </div>
            <div className="iconHidePassword2">
              <label>
                Senha
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                  required
                />
                <button type="button" onClick={hidePassword}>
                  <img
                    src={
                      showPassword ? iconOffHidePassword : iconOnHidePassword
                    }
                  />
                </button>
              </label>
            </div>
            <div className="iconHidePassword2">
              <label>
                Nova senha
                <input
                  type={showConfirmedPassword ? "text" : "password"}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  value={novaSenha}
                  required
                />
                <button type="button" onClick={hideNewPassword}>
                  <img
                    src={
                      showConfirmedPassword
                        ? iconOffHidePassword
                        : iconOnHidePassword
                    }
                  />
                </button>
              </label>
            </div>
          </div>
          <div className="ihaveCodeFooter">
            <Button type="submit">
              {secondLoading ? "Carregando..." : "Redefinir senha"}
            </Button>
          </div>
          {segundoErro ? (
            <p className="error">{segundoErro}</p>
          ) : (
            <p className="mensagem">{segundaMensagem}</p>
          )}
        </form>
      </div>
      <p className="linkToLogin">
        Lembrou a senha? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
};
