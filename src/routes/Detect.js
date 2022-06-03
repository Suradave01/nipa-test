import { Hidden } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import "./styles/Detect.css";

const Detect = () => {
  const location = useLocation();
  const state = location.state;
  console.log(state.Data[0].bounding_box);
  const dataState = state.Data;
  console.log(dataState);

  return (
    <div className="app-detect" >
      <img src={state.img}></img>
      {dataState.map((data, i) => {
        return (
          <div
            key={i}
            className="border-detect"
            style={{
              border: "8px solid green",
              position: "absolute",
              top: data.bounding_box.top,
              left: data.bounding_box.left,
              width: data.bounding_box.right,
              minHeight: data.bounding_box.bottom,
              maxHeight: "100%"
            }}
          >
            <div key={i}>
              <p style={{background:"white",padding:"3%",width:"40%",fontSize:"15px",borderRadius:"20px",color:"black"}}>
                name:{data.name} &nbsp;| parent:{data.parent}&nbsp; | confidence:{data.confidence}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Detect;
