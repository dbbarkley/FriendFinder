
// Dependencies
// =============================================================
var express = require("express");
var htmlRouting = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// All routes
htmlRouting(app);
apiRoutes(app);

// Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});