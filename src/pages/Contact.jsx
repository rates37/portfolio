import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import TwinklingZoomingStarField from "../models/StarField";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = () => {};

  // return <div className="text-white w-full h-screen relative bg-zinc-900">Contact</div>;
  return (
    <>
    <div className="blur-backdrop fixed top-0 left-0 w-full h-full overflow-hidden z-10"></div>

      <section className="relative flex lg:flex-row flex-col max-container h-screen z-20">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text text-white">Get in touch</h1>
          <form className="w-full flex flex-col gap-7 mt-14">
            <label className="text-white font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="John Smith"
                required
                value={form.name}
                onChange={handleChange}
              ></input>
            </label>

            <label className="text-white font-semibold">
              Email
              <input
                type="text"
                name="email"
                className="input"
                placeholder="johnsmith@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
              ></input>
            </label>

            <label className="text-white font-semibold">
              Your Message
              <textarea
                name="message"
                rows={4}
                className="textarea"
                placeholder="Let's talk!"
                required
                disabled={isLoading}
                value={form.email}
                onChange={handleChange}
              ></textarea>
            </label>

            <button type="submit" className="btn">
              {isLoading ? "Submitting ..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
