import React from "react";
import { GiCrossMark } from "react-icons/gi";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <>
      <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
            <GiCrossMark className="ml-auto pr-2 pt-2 m-0 cursor-pointer" style={{fontSize:'22px'}} onClick={()=> onClose(false)}/>
          <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]" >
            <img src={imgUrl} alt="display-image" className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayImage;
