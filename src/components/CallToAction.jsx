import React from "react";
import { Link } from "react-router-dom";
import { socials } from "../constants";

const CallToAction = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Want to talk? <br className="sm:block hidden" />
        Let's work on something together!
      </p>
      <Link to={socials.linkedin.link} className="contact-btn">
        <span className="font-semibold social-link">
          LinkedIn{" "}
          <img
            src={socials.linkedin.iconUrl}
            alt={socials.linkedin.name}
            className="w-1/2 h-1/2 object-contain px-2  max-h-6"
          />
        </span>
      </Link>

      <Link to={socials.github.link} className="contact-btn">
        <span className="font-semibold social-link">
          GitHub{" "}
          <img
            src={socials.github.iconUrl}
            alt={socials.github.name}
            className="w-1/2 h-1/2 object-contain px-2 max-h-6"
          />
        </span>
      </Link>
    </section>
  );
};

export default CallToAction;
