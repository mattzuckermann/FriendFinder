const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/static", express.static(path.join(__dirname, "assets")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.listen(PORT, function () {
    console.log(__dirname);
    console.log("App listening on PORT http://localhost:" + PORT);
});