import React, { useState } from "react";
import image4 from "../assest/banner/img4.jpg";
import slider1 from "../assest/banner/slider1.png";
import slider2 from "../assest/banner/slider2.png";
import slider3 from "../assest/banner/slider3.png";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [slider1, slider3, slider2, image4];

  const nextImage = () => {
    if (currentImage == desktopImages.length - 1) {
      setCurrentImage(0);
      return null;
    }
    setCurrentImage(currentImage + 1);
  };
  const prevImage = () => {
    if (currentImage == 0) {
      setCurrentImage(4);
      return null;
    }
    setCurrentImage(currentImage - 1);
  };

  return (
    <div className="container mx-auto px-4  mt-3">
      <div className="h-60 w-full bg-slate-200 rounded relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl px-1">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tab view */}
        <div className="flex h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={`slide${index}`}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full object-fill" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
