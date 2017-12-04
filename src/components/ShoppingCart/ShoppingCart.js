import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import Checkout from "../Checkout/Checkout.js";
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
    axios.get(`/cart/total`).then(response => {
      this.setState({ orderTotal: response.data[0].sum });
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
        <div key={index} className="cart-details">
          <img className="cart-img" src={product.image_url} />
          <div className="name-price">
            <h4>{product.product_name}</h4>
            <h4>${product.product_price}.00</h4>
            <button
              className="delete"
              onClick={() => this.deleteItemFromCart(product)}
            >
              DELETE
            </button>
          </div>
        </div>
      );
    }, this);

    return (
      <div className="shoppingCart-container">
        <Navbar />

        <h1 className="cart-title">WELCOME TO YOUR CART</h1>
        <hr className="hr" />

        <div className="cart-container">{cart}</div>
        <Checkout
          className="checkout-button"
          name={"yolo cycles"}
          description={"Thank you for shopping with us!"}
          amount={this.state.orderTotal}
        />
        <h1>${this.state.orderTotal}.00</h1>
      </div>
    );
  }
}

export default ShoppingCart;
