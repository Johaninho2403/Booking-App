import React from "react";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] justify-between gap-2 min-h-[90vh]">
      <div className="flex items-center justify-center md:justify-start">
        <div>
          <h1 className="font-bold text-[40px] max-w-120">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="my-10 sm:w-9/12">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
            doloribus quae. Dolorum, neque temporibus, molestias eveniet
            reiciendis optio iure, quisquam asperiores doloremque.
          </p>
          <Searchbar />
        </div>
      </div>
      <div className="bg-[#FCF5F3] relative hidden md:flex items-center">
        <img
          src="/bg.png"
          alt="hero image"
          className="w-[105%] max-w-none absolute right-0"
        />
      </div>
    </div>
  );
};

export default Hero;
