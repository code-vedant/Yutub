import React from "react";
import Subscriber from "../assets/Subscriber.png";
import "../style/SmallComponents.css";

function NoSubscriber() {
  return (
    <div className="NoContent">
      <div className="NCimgHolder">
        <img src={Subscriber} alt="No Subscribers" />
      </div>
      <div className="NCtext">
        <h5>No Subscribers</h5>
        <p>
        </p>
      </div>
    </div>
  );
}

export default NoSubscriber;
