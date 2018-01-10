import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-middleText">
          <h4>NEWSLETTER</h4>
          <hr />
          <p>
            Subscribe to get special offers, giveaways, and once-in-a-lifetime
            deals.
          </p>
          <input />
          <button>SUBMIT</button>
        </div>

        <div className="footer-company-info">
          <ul>
            <li> &copy; Yolo Cycles</li>
            <li>RETURNS & EXCHANGES</li>
            <li>TERMS OF SERVICE</li>
            <li>PRIVACY</li>
            <li>CONTACT</li>
            <li>ABOUT</li>
          </ul>
        </div>
        <div className="footer-socialMedia">
          <i className="fa fa-facebook" aria-hidden="true" />
          <i class="fa fa-twitter" aria-hidden="true" />
          <i class="fa fa-linkedin" aria-hidden="true" />

          <i class="fa fa-instagram" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default Footer;
