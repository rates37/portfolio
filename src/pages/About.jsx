import React from "react";
import { skills, experiences } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CallToAction from "../components/CallToAction";
import { Canvas } from "@react-three/fiber";
import TwinklingZoomingStarField from "../models/StarField";

const About = () => {
  return (
    <>
    <div className="blur-backdrop fixed top-0 left-0 w-full h-full overflow-hidden z-10"></div>

    <div className="text-white w-full h-full relative z-20">
      <section className="max-container">
        <h1 className="head-text">
          Hello, I'm{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Satya
          </span>
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-400">
          <p>
            A Software Engineer based in Melbourne, specialising in AI and Web
            Development.
          </p>
        </div>

        <div className="py-10 flex flex-col">
          <h3 className="subhead-text">My Skills</h3>

          <div className="mt-16 flex flex-wrap gap-12">
            {skills.map((skill, i) => (
              <div className="block-container w-20 h-20 " key={`skill-${i}`}>
                <div className="btn-back rounded-xl bg-white" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <h3 className="subhead-text">My Experience</h3>

          <div className="mt-5 flex flex-col gap-3 text-slate-400">
            <p>
              I've worked in various teams and environments, levelling up my
              skills and interacting with a diverse range of clients, customers,
              and coworkers. Here are the highlights:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience, i) => (
                <VerticalTimelineElement
                  key={`exp-${i}`}
                  date={experience.date}
                  dateClassName={"text-white"}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                    backgroundColor: "rgb(72 72 82 / var(--tw-bg-opacity, 1))",
                  }}
                  iconStyle={{ background: experience.iconBg }}
                >
                  <div>
                    <h3 className="text-white text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-slate-300 font-medium font-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, idx) => (
                      <li
                        className="text-slate-300 font-normal pl-1 text-sm"
                        key={`exp-point-${idx}`}
                        dangerouslySetInnerHTML={{ __html: point }} // not great thing to do, // todo: look for workaround
                      ></li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />

        <CallToAction />
      </section>
    </div></>
  );
};

export default About;
