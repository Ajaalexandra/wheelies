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
        <Link to={`/details/${product.id}`} key={index}>
          <h1>{product.brand + " " + product.model}</h1>
          <img src={product.image_url} className="all-images" />
        </Link>
      );
    });

    return (
      <div className="products-list">
        <Navbar />
        <select
          className="select-brand"
          onChange={e => this.handleFilterByBrand(e.target.value)}
        >
          <option value="BMW">BMW</option>
          <option value="Ducati">Ducati</option>
          <option value="Honda">Honda</option>
          <option value="Indian">Indian</option>
          <option value="Kawasaki">Kawasaki</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Yamaha">Yamaha</option>
        </select>

        <button className="filter" onClick={() => this.submitFilter()}>
          filter
        </button>
        <SearchBar />
        {products}
      </div>
    );
  }
}

export default Products;
