var express = require ("express");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// How to select all the different multiple controller files OR use a controllers AND routes folder?
var routes = require("");

app.use(routes);

app.listen(PORT, () => console.log("Server listening on: https://localhost:" + PORT))