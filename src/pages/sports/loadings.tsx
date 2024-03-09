import React from "react";
import "./sport.css";

const SkeletonLoading: React.FC = () => {
  return (
    <div className="content-box1g ">
      <div className="image-wrapper-loadingg relative">
        <div className="w-[300px] h-[200px] object-cover rounded-t-lg min-[1024px]:rounded-l-lg relative p-10 ">
          <div className="square-boxg animate-loading"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-black text-center">
            <div className="text-lg font-bold mb-2">
              <b>
                <div
                  className="mx-auto animate-loading"
                  style={{ width: "100px", height: "10px", backgroundColor: "#67696b" }}
                ></div>
              </b>
            </div>
            <div className="text-lg font-bold mb-2 animate-loading">
              <div
                className="mx-auto animate-loading"
                style={{ width: "500px", height: "10px", backgroundColor: "#67696b" }}
              ></div>
            </div>
            {/* Add other details like summary or date if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
