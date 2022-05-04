import logo from "../../assets/logo/raro-academy-branco.svg";
import iconInstagram from "../../assets/icons/social-media/instagram.svg";
import iconTwitter from "../../assets/icons/social-media/twitter.svg";
import iconYoutube from "../../assets/icons/social-media/youtube.svg";
import iconLinkedin from "../../assets/icons/social-media/linkedin.svg";

import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div>
          <a href="https://www.raroacademy.com.br/" target="_blank">
            <img src={logo} alt="raroAcademyLogo" />
          </a>
        </div>
        <div>
          <h3>Empresa</h3>
          <ul>
            <li>
              <a href="https://www.raroacademy.com.br/" target="_blank">
                Raro Academy
              </a>
            </li>
            <li>
              <a href="https://rarolabs.com.br/" target="_blank">
                Raro Labs
              </a>
            </li>
            <li>
              <a href="#">Política de Privacidade</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Curso</h3>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Instrutores</a>
            </li>
            <li>
              <a href="#">Comunidade</a>
            </li>
            <li>
              <a href="#">Guia de aluno</a>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <ul>
            <li>
              <a href="https://www.instagram.com/raroacademy/" target="_blank">
                <img src={iconInstagram} alt="iconInstagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/showcase/raroacademy/"
                target="_blank"
              >
                <img src={iconLinkedin} alt="iconLinkedin" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/RaroAcademy" target="_blank">
                <img src={iconTwitter} alt="iconTwitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCAUAbOc54PreKLahvnt5jrw/featured"
                target="_blank"
              >
                <img src={iconYoutube} alt="iconYoutube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerTwo">
        Raro Academy - 2022 | Alguns direitos reservados
      </div>
    </div>
  );
};
