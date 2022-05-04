import iconDiscord from "../../assets/icons/social-media/discord.svg";

import "./CTASection.css";

export const CTASection = () => {
  return (
    <div className="cta-container">
      <section className="cta-section">
        <div>
          <p className="cta-section-text">
            Participe do nosso grupo de estudos!
          </p>
        </div>
        <div>
          <a href="https://discord.gg/mEa2e39Dsn" target="_blank">
            <button className="cta-button">
              <img src={iconDiscord} alt="icon Discord" />
              <p>comunidade exclusiva</p>
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};
