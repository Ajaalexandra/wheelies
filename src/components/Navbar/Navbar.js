import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <img
              className="nav-logo"
              src={require("../../Images/logo .jpg")}
              alt="logo"
            />
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
