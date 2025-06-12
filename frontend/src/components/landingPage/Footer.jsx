import React from "react";
import "../../style/footer.css"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="footer-main">
        <section className="footer-main-top">
        <div>YUTUB</div>
        <div>
          <h4>Explore</h4>
          <h6>Videos</h6>
          <h6>Photos</h6>
        </div>
        <div>
          <h4>Connect</h4>
          <Link>LindedIn</Link>
          <Link>Github</Link>
          <Link>X</Link>
        </div>
        </section>
        <section className="footer-main-bottom">
            <h5>Made with ❤️. A Project by Vedant Uekey</h5>
        </section>
      </section>
    </>
  );
}
