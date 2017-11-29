const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const connectionString = require("../config.js").massive;
// const Auth0Strategy = require("passport-auth0");
// const { secret } = require("../config.js").session;
// const { domain, clientID, clientSecret } = require("../config").auth0;

const port = 3001;
const app = express();

//need massive to connect database to node Server
massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log);

//Middlewares
app.use(json());
app.use(cors());
// app.use(
//   session({
//     secret,
//     resave: false,
//     saveUninitialized: false
//   })
// );

//Endpoints!!!!!!!!!!!

//test endpoint
app.get("/api/test", (req, res, next) => {
  const dbInstance = req.app.get("db");
  // console.log(dbInstance);
  dbInstance
    .getUsers()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json());
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
