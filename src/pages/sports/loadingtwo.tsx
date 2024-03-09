import React from "react";
import "./sport.css";

const SkeletonLoadingtwo: React.FC = () => {
  return (
    <div className="rect-boxg ">
      <div className="matchl-name animate-loading" style={{ width: "400px", height: "40px", backgroundColor: "#67696b" }}></div>
      <div className="match-description animate-loading" style={{ width: "360px", height: "10px", backgroundColor: "#67696b", marginTop: "10px" }}></div>
      <div className="match-teaml animate-loading" style={{ width: "360px", height: "10px", backgroundColor: "#67696b", marginTop: "10px" }}>
        <div></div>
      </div>
      <div className="match-location animate-loading"style={{ width: "180px", height: "10px", backgroundColor: "#67696b", marginTop: "10px" }}>
        <div className="animate-loading" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="animate-loading"></span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingtwo;
