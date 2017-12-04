import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      featuredProducts: []
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentWillMount() {
    axios.get(`/featuredProducts`).then(response => {
      this.setState({ featuredProducts: response.data });
      console.log("featuredProducts", this.state.featuredProducts);
    });
  }

  addToCart(bike) {
    if (bike) {
      axios.post("/cart", {
        product_name: bike.model,
        product_price: bike.price,
        image_url: bike.image_url
      });
      alert("Bike added to cart! Yay");
    }
  }

  render() {
    var featured = this.state.featuredProducts.map(function(featured, index) {
      return (
        <div key={index} className="product-card">
          <Link to={`details/${featured.id}`}>
            <img src={featured.image_url} className="featured-images" />
            <h1 className="product-info">{featured.brand}</h1>
            <p className="hidden product-info">${featured.price}.00</p>
          </Link>

          <button
            className="hidden addToCart"
            onClick={() => this.addToCart(featured)}
          >
            ADD TO CART
          </button>
        </div>
      );
    }, this);

    return (
      <div className="home-container">
        <Navbar />
        <div className="top-container" />
        <div className="mid-container">
          <div className="left-box">
            <div>
              <h3>WHEELIES FOR MY FEELIES</h3>
              <hr />
              <p className="mid-text">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo
              </p>
            </div>
          </div>
          <div className="right-box" />
        </div>

        <h1 className="products">FEATURED PRODUCTS</h1>
        <div className="featured-product-container">{featured}</div>
      </div>
    );
  }
}

export default Home;
