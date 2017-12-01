import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./ShoppingCart.css";

class ShoppingCart extends Component {
  render() {
    return (
      <div className="shoppingCart-container">
        <Navbar />
      </div>
    );
  }
}

export default ShoppingCart;
