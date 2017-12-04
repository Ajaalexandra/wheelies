import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import SearchBar from "../SearchBar/SearchBar.js";
import "./Products.css";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      filteredList: [],
      filterBrand: ""
    };
    //binds
    this.handleFilterByBrand = this.handleFilterByBrand.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  //axios request
  componentWillMount() {
    axios.get("/products").then(response => {
      this.setState({ productsList: response.data });
      console.log("productsList", this.state.productsList);
    });
  }

  //methods

  handleFilterByBrand(brand) {
    this.setState({ filterBrand: brand });
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

  submitFilter() {
    axios.get(`/products/brand/${this.state.filterBrand}`).then(response => {
      this.setState({
        productsList: response.data
      });
    });
    console.log(this.state.filterBrand);
  }

  render() {
    var products = this.state.productsList.map(function(product, index) {
      return (
        <div key={index} className="product-card">
          <Link to={`/details/${product.id}`}>
            <div>
              <img src={product.image_url} className="all-images" />
              <h1 className="product-info">
                {product.brand + " " + product.model}
              </h1>
              <p className="hidden product-info">${product.price}.00</p>
            </div>
          </Link>

          <button
            className="hidden addToCart"
            onClick={() => this.addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      );
    }, this);

    return (
      <div className="products-main-container">
        <Navbar />
        <div className="products-top-container">
          <div className="select-filter">
            <select
              className="select-brand"
              onChange={e => this.handleFilterByBrand(e.target.value)}
            >
              <option value=" " disabled selected>
                SELECT BRAND
              </option>
              <option value="BMW">BMW</option>
              <option value="Ducati">Ducati</option>
              <option value="Honda">Honda</option>
              <option value="Indian">Indian</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Yamaha">Yamaha</option>
            </select>

            <button className="filter-btn" onClick={() => this.submitFilter()}>
              FILTER
            </button>
          </div>

          <div className="search-bar">
            <h3>SEARCH:</h3>
            <SearchBar />
          </div>
        </div>
        <h1 className="products">PRODUCTS</h1>
        <div className="products-grid">{products}</div>
      </div>
    );
  }
}

export default Products;
