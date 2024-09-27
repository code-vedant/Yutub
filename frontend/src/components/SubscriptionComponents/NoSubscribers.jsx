import React from "react";
import "../../style/SmallComponents.css";
import subs from "../../assets/subs.png";

function Nosubs() {
  return (
    <div className="NoContent">
      <div className="NCimgHolder">
        <img src={subs} alt="No subs" />
      </div>
      <div className="NCtext">
        <h5>No Subcribers to the Channel</h5>
        <p>This channel has no subscribers yet. Consider subscribing to the channel</p>
      </div>
    </div>
  );
}

export default Nosubs;
