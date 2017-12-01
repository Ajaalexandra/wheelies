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
  }

  componentWillMount() {
    axios.get(`/featuredProducts`).then(response => {
      this.setState({ featuredProducts: response.data });
      console.log("featuredProducts", this.state.featuredProducts);
    });
  }

  render() {
    var featured = this.state.featuredProducts.map(function(featured, index) {
      return (
        <Link to={`details/${featured.id}`} key={index}>
          <img src={featured.image_url} className="featured-images" />
        </Link>
      );
    });

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

        <div className="featured-product-container">
          <h1 className="products">FEATURED PRODUCTS</h1>
          {featured}
        </div>
      </div>
    );
  }
}

export default Home;
