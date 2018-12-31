const friendsData = require("../data/friends.js");

console.log(friendsData);

$("#surveySubmit").on("click", function () {
    function checkValid() {
        let formsFilled = true;

        // =======================================
        // FIND OUT IF THIS IS PROPER SYNTAX BELOW
        // =======================================
        if ($(".custom-select").children("options").attr("selected").val() === "Select an Option"
            || $("#inputName").val().trim() === "" || $("#inputName").val() === null
            || $("#inputPhoto").val().trim() === "" || $("#inputPhoto").val() === null) {
            let formsFilled = false;
        }
        return formsFilled;
    }
    if (checkValid()) {
        // Push new individual into friends.js
        const emptyNameValue = $("#inputName").val().trim();
        const emptyPhotoValue = $("#inputPhoto").val().trim();
        let personalScoreArr = [];
        // Looping through class to get values to be pushed into personalScoreArr
        ($(".custom-select").each(function () {
            let currentScoreValue = $(this).val();
            personalScoreArr.push(currentScoreValue);
        }));
        const newPersonObject = {
            name = emptyNameValue,
            photo = emptyPhotoValue,
            scores = personalScoreArr
        }
        friendsData.push(newPersonObject);

        const allScoreDifferenceArr = [];
        // Compare scores between individual and function to show modal popup of match
        for (const i = 0; i < friendsData.length - 1; i++) {
            let otherScoreArr = [];
            let differenceScoreArr = [];
            for (const j = 0; j < friendsData[i].scores.length; j++) {
                otherScoreArr.push(friendsData[i].scores[j]);
                let currentScoreDifference = personalScoreArr[j] - otherScoreArr[j];
                if (currentScoreDifference < 0) {
                    let currentScoreDifference = currentScoreDifference * -1;
                }
                differenceScoreArr.push(currentScoreDifference);
            }
            function getSum(total, num) {
                return total + num;
            }
            let reducedScoreDifference = differenceScoreArr.reduce(getSum, 0);
            allScoreDifferenceArr.push(reducedScoreDifference);
        }
        allScoreDifferenceArr.sort(function (a, b) {
            return a - b
        });
        individualMatch = {
            name: allScoreDifferenceArr[0].name,
            photo: allScoreDifferenceArr[0].photo
        }
        $("#modalMatchName").text(individualMatch.name);
        $("#modalMatchPhoto").attr("img", individualMatch.photo);
        $("#modalPopUp").attr("style", "display:block");
    } else {
        alert("Please be sure to fill in all forms and selectors");
    }
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