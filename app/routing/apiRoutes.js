const friendsData = require("../data/friends");

$("#surveySubmit").on("click", function () {
    function checkValid() {
        let formFilled = true;
        if ($(".form-control").each().val() === "" || $(".form-control").each().val() === null || $(".custom-select").each().children().val() === "Select an Option") {
            let formFilled = false;
        }
        return formFilled;
    }
    console.log(checkValid());
});

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });
    app.post("/api/friends", function (req, res) {
        friendsData.push(req.body);
        res.json(true);
    });
};