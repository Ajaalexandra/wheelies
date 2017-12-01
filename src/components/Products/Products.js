import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./Products.css";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      productsList: []
    };

    //binds
  }

  //methods

  componentWillMount() {
    axios.get("/products").then(response => {
      this.setState({ productsList: response.data });
      console.log("productsList", this.state.productsList);
    });
  }

  render() {
    var products = this.state.productsList.map(function(product, index) {
      return (
        <Link to={`/details/${product.id}`} key={index}>
          <h1>{product.brand + product.model}</h1>
          <img src={product.image_url} className="all-images" />
        </Link>
      );
    });

    return (
      <div className="products-list">
        <Navbar />
        {products}
      </div>
    );
  }
}

export default Products;
