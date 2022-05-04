import "./Hero.css";
import heroImage from "../../assets/laptop.svg";
import { Button } from "../Button";

export const Hero = () => {
  return (
    <div className="hero-container">
      <section className="hero-section">
        <div className="hero-column-1">
          <h2>
            <span className="hero-column-upper">Desenvolva sua</span>
            <br></br>
            <span className="hero-column-title">carreira em tecnologia</span>
          </h2>

          <p className="hero-column-text">
            Aprenda com os melhores programadores da <strong>Raro Labs</strong>,
            com desafios práticos semanais e vivências em times de
            desenvolvimento.
          </p>

          <a href="https://www.raroacademy.com.br/" target="_blank">
            <Button>Saiba mais</Button>
          </a>
        </div>
        <div className="hero-column-2">
          <img src={heroImage} alt="hero" />
        </div>
      </section>
    </div>
  );
};
