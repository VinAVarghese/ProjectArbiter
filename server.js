var express = require ("express");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
var frontendRoutes = require("./controllers/frontend");
app.use(frontendRoutes);
var favRoutes = require("./controllers/favorites_controller");
app.use(favRoutes);
var userRoutes = require("./controllers/users_controller");
app.use(userRoutes);
var tastediveRoutes = require("./controllers/third_party_api/tastedive-api-routes");
app.use(tastediveRoutes);
var zomatoRoutes = require("./controllers/third_party_api/zomato-api-route");
app.use(zomatoRoutes);
var ticketmasterRoutes = require("./controllers/third_party_api/ticketmaster-api-routes");
app.use(ticketmasterRoutes);

db.sequelize.sync({force:true}).then(function() {
    app.listen(PORT, function() {
      console.log("App now listening on port:", PORT);
    });
  });