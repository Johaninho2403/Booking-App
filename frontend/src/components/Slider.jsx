import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { singlePostData } from "../assets/dummy-data";

const Slider = () => {
  const { currentImage, showSlider, setShowSlider, setCurrentImage } =
    useContext(AppContext);
  return (
    showSlider && (
      <div className="fixed top-0 left-0 right-0 h-screen bg-[rgba(0,0,0,0.8)] flex justify-between items-center z-100 px-2 sm:px-10">
        <span
          className="absolute top-10 right-10 text-white text-3xl cursor-pointer"
          onClick={() => setShowSlider(false)}
        >
          X
        </span>
        <img
          src="/arrow.png"
          alt="arrow"
          className={`w-5 sm:w-10 ${
            currentImage === 0 ? "opacity-30 cursor-auto" : "cursor-pointer"
          }`}
          onClick={() => {
            currentImage > 0 && setCurrentImage((prev) => prev - 1);
          }}
        />
        <img
          src={singlePostData.images[currentImage]}
          alt="property"
          className="w-3/4 h-[50vh] sm:h-[75vh] object-cover"
        />
        <img
          src="/arrow.png"
          alt="arrow"
          className={`w-5 sm:w-10 rotate-180  ${
            currentImage === singlePostData.images.length - 1
              ? "opacity-30 cursor-auto"
              : "cursor-pointer"
          }`}
          onClick={() => {
            currentImage < singlePostData.images.length - 1 &&
              setCurrentImage((prev) => prev + 1);
          }}
        />
      </div>
    )
  );
};

export default Slider;
