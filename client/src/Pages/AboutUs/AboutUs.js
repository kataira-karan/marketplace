import React from "react";
import "./AboutUsStyle.css";
import avleen from "../../Static/avleen.jpeg";
import diksha from "../../Static/diksha.jpeg";
import shivam from "../../Static/shivam.jpeg";
import vandana from "../../Static/vandana.jpeg";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <div>
      <div class="container">
        <div class="grid">
          <div class="card">
            <div class="card_img">
              <img className="member-image" src={shivam} alt="" />
            </div>
            <div class="card_body">
              <h2 class="card_title">Shivam Dahiya </h2>
              <h6 class="designation">sdahiya6999@conestogac.on.ca</h6>
              {/* <h4>lorem </h4> */}
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img className="member-image" src={avleen} alt="" />
            </div>
            <div class="card_body">
              <h2 class="card_title">Avleen Kaur</h2>
              <h6 class="designation">avleenkaur6146@conestogac.on.ca</h6>
              {/* <h4>Avlee </h4> */}
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img className="member-image" src={diksha} alt="" />
            </div>
            <div class="card_body">
              <h2 class="card_title">Diksha</h2>
              <h6 class="designation">Dsharma5418@conestogac.on.ca</h6>
              {/* <h4>lorem </h4> */}
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img className="member-image" src={vandana} alt="" />
            </div>
            <div class="card_body">
              <h2 class="card_title">Vandana</h2>
              <h6 class="designation">Vthummala1448@conestogac.on.ca</h6>
              {/* <h4>lorem </h4> */}
            </div>
          </div>
        </div>
        <div className="aboutus-link">
          <div>Github Link</div>

          <Link to="/projectlink/gitlink">
            https://github.com/Shivamdahiya63125/capstoneProject
          </Link>
        </div>

        <span className="aboutus-link">
          {" "}
          <div>Live Link</div>
          <Link to="/projectlink/livelink">
            https://capstone-client-b1q59y1a6-shivamdahiya63125.vercel.app/{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AboutUs;
