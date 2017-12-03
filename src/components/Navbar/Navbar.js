import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <div className="logo">
              <img
                className="nav-logo"
                src={require("../../Images/logo2.png")}
                alt="logo"
              />
              <h3 className="yolo">yolo cycles</h3>
            </div>
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/about">
            <h3>ABOUT</h3>
          </Link>
          <Link to="/products">
            <h3>PRODUCTS</h3>
          </Link>
          <Link to="/cart">
            <h3>CART</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
