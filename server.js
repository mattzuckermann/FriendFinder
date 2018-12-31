const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});


// CREATE DRY CODE WITH THESE TOOLS:
    // USE HANDLEBARS
    // USE CONSTRUCTOR FUNCTIONS
    // USE FOR LOOPS TO POST IN HTML USING HANDLEBARS?