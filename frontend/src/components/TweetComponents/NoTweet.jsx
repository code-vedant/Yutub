import React from "react";
import "../../style/SmallComponents.css";
import tweet from "../../assets/tweet.png";

function NoTweet() {
  return (
    <div className="NoContent">
      <div className="NCimgHolder">
        <img src={tweet} alt="No tweets" />
      </div>
      <div className="NCtext">
        <h5>No tweets available</h5>
        <p>This page has no tweets yet. Check back later for updates.</p>
      </div>
    </div>
  );
}

export default NoTweet;
