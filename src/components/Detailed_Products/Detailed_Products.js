import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./Detailed_Products.css";

class Detailed_Products extends Component {
  constructor() {
    super();

    this.state = {
      product: []
    };

    this.addToCart = this.addToCart.bind(this); //BINDS
  }

  //AXIOS REQUEST

  componentWillMount() {
    axios.get(`/products/${this.props.match.params.id}`).then(response => {
      console.log(response.data);
      this.setState({ product: response.data });
    });
  }

  //METHODS
  //dont always have to setState

  addToCart(bike) {
    if (bike) {
      axios.post("/cart", {
        product_name: bike.model,
        product_price: bike.price
      });
      alert("Bike added to cart! Yay");
    }
  }

  // had to make a variable because it was undefined
  render() {
    var bike = this.state.product[0];
    return (
      <div>
        <Navbar />

        {console.log("product", this.state.product)}
        <div className="detailed-main-container">
          <img
            className="detailed-left-container"
            src={bike && bike.image_url}
          />
          <div className="detailed-right-container">
            <h1>{bike && bike.model}</h1>
            <hr />
            <h3>PRODUCT DESCRIPTION:</h3>
            <p className="detailed-description">{bike && bike.description}</p>
            <p>${bike && bike.price}.00</p>
            <button className="addToCart" onClick={() => this.addToCart(bike)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Detailed_Products;
