import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link className="neo-brutalism-white neo-btn" to={link}>
      {btnText}
      <img className="w-4 h-4 object-contain" src={arrow} />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I'm <span className="font-semibold underline">Satya</span>
      <br />{" "}
      <span className="text-base">
        An electronics and software <br />
        engineer based in <span className="font-semibold">Melbourne</span>
      </span>
    </h1>
  ),
  2: (
    <InfoBox
      text="Diverse range of skills in electrical, computer systems, and software engineering."
      link="/about"
      btnText="Learn More"
    />
  ),
  3: (
    <InfoBox
      text="Worked on various projects over the years. Want to see?"
      link="/projects"
      btnText="Visit my Portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done, or looking to chat?"
      link="/contact"
      btnText="Let's Talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
