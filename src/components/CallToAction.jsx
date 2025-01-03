import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Want to talk? <br className="sm:block hidden" />
        Let's work on something together!
      </p>
      <Link to="/contact" className="btn">
        <span className="font-semibold">Contact</span>
      </Link>
    </section>
  );
};

export default CallToAction;
