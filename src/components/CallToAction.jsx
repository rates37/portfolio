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
      <Link to={socials.linkedin.link} className="linkedin-btn">
        <span className="font-semibold social-link">LinkedIn {" "}<img
                      src={socials.linkedin.iconUrl}
                      alt={socials.linkedin.name}
                      className="w-1/2 h-1/2 object px-2"
                    /></span>
      </Link>
    </section>
  );
};

export default CallToAction;
