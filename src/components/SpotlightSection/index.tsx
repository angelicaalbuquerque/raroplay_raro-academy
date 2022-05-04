import { Button } from "../Button";
import { useAuthenticated } from "../VerifyAuth";
import "./SpotlightSection.css";

export const SpotlightSection = () => {
  const { isAuthenticated } = useAuthenticated();

  return (
    <>
      {!isAuthenticated && (
        <div className="spotlight-container">
          <section className="spotlight-section">
            <div className="spotlight-info">
              <h2 className="spotlight-title">Conheça a Raro Academy</h2>
              <p className="spotlight-section-text">
                A <strong>Raro Academy</strong> é a escola de formação e
                especialização de profissionais de tecnologia da{" "}
                <strong>Raro Labs</strong>, cujas aulas você encontra aqui no{" "}
                <strong>Raroplay</strong>.
              </p>
            </div>

            <div className="spotlight-video-player">
              <iframe
                width="720"
                height="480"
                src="https://www.youtube.com/embed/BdkJdqTRM2A"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <a href="https://www.raroacademy.com.br/" target="_blank">
              <Button>Saiba mais</Button>
            </a>
          </section>
        </div>
      )}
    </>
  );
};
