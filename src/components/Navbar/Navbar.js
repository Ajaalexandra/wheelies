import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      cartTotal: 0
    };
  }

  componentDidMount() {
    axios.get(`/cart`).then(response => {
      this.setState({
        cartTotal: response.data.length
      });
    });
  }

  componentWillUpdate() {
    axios.get(`/cart`).then(response => {
      this.setState({
        cartTotal: response.data.length
      });
    });
  }

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
              <h3 className="yolo">Yolo Cycles</h3>
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
            <h3>CART ({this.state.cartTotal})</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
