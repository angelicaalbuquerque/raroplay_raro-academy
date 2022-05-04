import { Link } from "react-router-dom";
import LogoRaroPlay from "../../assets/logo/raroplay-logo-branco.svg";
import Navigation from "../../components/Navigation";
import "./Header.css";
const Header = ({ buscarVideos }: any) => (
  <header className="header-container">
    <div className="header">
      <div className="content">
        <div>
          <Link to="/">
            <img className="logo" src={LogoRaroPlay} />
          </Link>
        </div>
        <nav className="navigation">
          <Navigation buscarVideos={buscarVideos} />
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
