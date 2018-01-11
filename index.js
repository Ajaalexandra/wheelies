require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");

// const connectionString = require("../config.js").massive;
const connectionString = process.env.CONNECTION_STRING;
const secretKey = process.env.SECRET_KEY;
const controller = require("./controllers/controller.js");

console.log(secretKey);

// const Auth0Strategy = require("passport-auth0");
// const { secret } = require("../config.js").session;
// const { domain, clientID, clientSecret } = require("../config").auth0;

//STRIPE
// const { secretKey } = require("../config.js").stripe;
const stripe = require("stripe")(secretKey);
const SERVER_CONFIGS = require("./constants/server");

const configureServer = require("./server");
const configureRoutes = require("./routes");

const port = process.env.PORT || 3001;
const app = express();

configureServer(app);
configureRoutes(app);

//need massive to connect database to node Server
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log);

//Middlewares
app.use(json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(`${__dirname}/build`));

//Endpoints!!!!!!!!!!!
app.get("/products", controller.getProducts);
app.get("/products/:id", controller.getProductsById);
app.get("/featuredProducts", controller.getFeaturedProducts);
app.get("/products/brand/:brand", controller.getFilteredProducts);
app.get("/cart", controller.getCart);
app.post("/cart", controller.addToCart);
app.delete("/cart/:id", controller.deleteItemFromCart);
app.get("/cart/total", controller.getCartTotal);

app.post("/checkout", (req, res) => {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    console.log(req.body);
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
      // console.log('response:', stripeRes);
    }
  });
});

//test endpoint
app.get("/api/test", (req, res, next) => {
  const dbInstance = req.app.get("db");
  // console.log(dbInstance);
  dbInstance
    .getUsers()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json());
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
