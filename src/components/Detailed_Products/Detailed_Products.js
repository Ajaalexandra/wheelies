import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./Detailed_Products";

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
    }
  }

  // had to make a variable because it was undefined
  render() {
    var bike = this.state.product[0];
    return (
      <div>
        {console.log("product", this.state.product)}
        <h1>{bike && bike.model}</h1>
        <p>{bike && bike.description}</p>
        <img src={bike && bike.image_url} />
        <button className="addToCart" onClick={() => this.addToCart(bike)}>
          ADD TO CART
        </button>
      </div>
    );
  }
}

export default Detailed_Products;
