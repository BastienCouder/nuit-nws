import React from "react";
import { ClipLoader } from "react-spinners";

const FullScreenLoader = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <ClipLoader color="#000000" size={150} />{" "}
  </div>
);

export default FullScreenLoader;
