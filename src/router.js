import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//my import Components being rendered
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Detailed_Products from "./components/Detailed_Products/Detailed_Products.js";

export default (
  <BrowserRouter>
    <div>
      <Route component={Home} exact path="/" />
      <Route component={Products} path="/products" />
      <Route component={ShoppingCart} path="/cart" />
      <Route component={Detailed_Products} path="/details/:id" />
    </div>
  </BrowserRouter>
);
