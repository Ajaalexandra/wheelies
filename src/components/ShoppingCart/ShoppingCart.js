import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./ShoppingCart.css";

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      orderTotal: 0
    };
    //binds
    this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
    // this.getCartTotal = this.getCartTotal.bind(this);
  }

  //axios call
  componentWillMount() {
    axios.get(`/cart`).then(response => {
      this.setState({ productList: response.data });
      console.log(response.data);
    });

    axios.get(`/cart/total`).then(response => {
      this.setState({ orderTotal: response.data[0].sum });
    });
  }

  //methods
  deleteItemFromCart(product) {
    axios.delete(`/cart/${product.id}`).then(response => {
      this.setState({ productList: response.data });
    });
  }

  // getCartTotal() {
  //   axios.get(`/cart/total`).then(response => {
  //     this.setState({ orderTotal: response.data[0].sum });
  //   });
  // }

  render() {
    var cart = this.state.productList.map(function(product, index) {
      return (
        <div key={index} className="cart-list">
          <h4>{product.product_name}</h4>
          <h4>{product.product_price}</h4>
          <button
            className="delete"
            onClick={() => this.deleteItemFromCart(product)}
          >
            DELETE
          </button>
        </div>
      );
    }, this);

    return (
      <div className="shoppingCart-container">
        <Navbar />
        <h1>WELCOME TO YOUR CART</h1>
        <hr />
        <div className="cart-container">{cart}</div>
        <button>PAY NOW</button>
        <h1>{this.state.orderTotal}</h1>
      </div>
    );
  }
}

export default ShoppingCart;
