const express = require ("express");
const app = express();
const db = require('./models')
const exphbs = require("express-handlebars");
const session = require ("express-session");
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(session({
  secret: process.env.SESSION_SECRET || "hthugu48h8",
  resave:false,
  saveUninitialized: true,
  cookie:{
      maxAge:7200000
  }
}))

// Routes for rendering and db interaction
const frontendRoutes = require("./controllers/frontend_controller");
app.use(frontendRoutes);
const authRoutes = require("./controllers/auth_controller");
app.use("/auth", authRoutes);
const userRoutes = require("./controllers/users_controller");
app.use(userRoutes);
const favRoutes = require("./controllers/favorites_controller");
app.use("/fav",favRoutes);

// Third Party API Routes for search results
const tastediveRoutes = require("./controllers/third_party_api/tastedive-api-routes");
app.use(tastediveRoutes);
const zomatoRoutes = require("./controllers/third_party_api/zomato-api-route");
app.use(zomatoRoutes);
const ticketmasterRoutes = require("./controllers/third_party_api/ticketmaster-api-routes");
app.use(ticketmasterRoutes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App now listening on port:", PORT);
    });
  });