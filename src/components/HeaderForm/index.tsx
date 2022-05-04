import { Link } from "react-router-dom";
import LogoRaroPlay from "../../assets/logo/raroplay-logo-azul.svg";
import "./headerForm.css";

export const HeaderForm = () => {
  return (
    <div className="headerForm">
      <Link to="/">
        <img src={LogoRaroPlay} />
      </Link>
    </div>
  );
};
