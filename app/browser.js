$("#surveySubmit").on("click", function (event) {
    event.preventDefault();

    //Function checking if all forms and selecions are filled out
    function checkValid() {
        let formsFilled;
        if ($("#inputName").val().trim() === "") {
            let formsFilled = false;
            return formsFilled;
        } else if ($("#inputPhoto").val().trim() === "") {
            let formsFilled = false;
            return formsFilled;
        } else if (
            $("#selection1").val() === "Select an Option" || $("#selection2").val() === "Select an Option" ||
            $("#selection3").val() === "Select an Option" || $("#selection4").val() === "Select an Option" ||
            $("#selection5").val() === "Select an Option" || $("#selection6").val() === "Select an Option" ||
            $("#selection7").val() === "Select an Option" || $("#selection8").val() === "Select an Option" ||
            $("#selection9").val() === "Select an Option" || $("#selection10").val() === "Select an Option") {
            let formsFilled = false;
            return formsFilled;
        } else {
            let formsFilled = true;
            return formsFilled;
        }
    }

    if (checkValid()) {
        // const queryURL = "https://friend-finder-zuckermann.herokuapp.com/api/friends";
        const queryURL = "http://localhost:3000/api/friends";
        $.ajax({
            url: queryURL,
            type: 'GET',
        }).then(function (response) {
            const friendsData = response;

            // Push new individual into friends.js
            const emptyNameValue = $("#inputName").val().trim();
            const emptyPhotoValue = $("#inputPhoto").val().trim();
            const personalScoreArr = [];
            // Looping through class to get values to be pushed into personalScoreArr
            ($(".custom-select").each(function () {
                let currentScoreValue = Number($(this).val());
                personalScoreArr.push(currentScoreValue);
            }));
            const newPersonObject = {
                name: emptyNameValue,
                photo: emptyPhotoValue,
                scores: personalScoreArr
            }
            friendsData.push(newPersonObject);
            $.ajax({
                url: "http://localhost:3000/api/friends",
                // url: "https://friend-finder-zuckermann.herokuapp.com/api/friends",
                method: "POST",
                data: newPersonObject
            });

            // Compare scores between individual and function to show modal popup of match
            const allScoreDifferenceArr = [];

            for (let i = 0; i < friendsData.length - 1; i++) {
                let differenceScoreArr = [];
                let otherScoreArr = [];
                for (let j = 0; j < friendsData[i].scores.length; j++) {
                    otherScoreArr.push(friendsData[i].scores[j]);
                    let currentScoreDifference = Math.abs(personalScoreArr[j] - otherScoreArr[j]);
                    differenceScoreArr.push(currentScoreDifference);
                }
                function getSum(total, num) {
                    return total + num;
                }
                let reducedScoreDifference = differenceScoreArr.reduce(getSum, 0);
                allScoreDifferenceArr.push(reducedScoreDifference);
            }

            //Matched names with score differences
            const scoreDifferenceList = [];
            for (let k = 0; k < friendsData.length - 1; k++) {
                scoreDifferenceList.push({
                    "name": friendsData[k].name, "photo": friendsData[k].photo, "scoreDifference": allScoreDifferenceArr[k]
                });
            }
            scoreDifferenceList.sort(function (a, b) {
                return a.scoreDifference - b.scoreDifference;
            });

            //After list is sorted from least to greatest, take first one in array as match (i.e. least different in score after being sorted)
            individualMatch = {
                name: scoreDifferenceList[0].name,
                photo: scoreDifferenceList[0].photo,
                scoreDifference: scoreDifferenceList[0].scoreDifference
            }
            $("#modalMatchName").text(individualMatch.name);
            $("#modalMatchPhoto").attr("src", individualMatch.photo);
            $("#modalScoreDifference").text(` ${individualMatch.scoreDifference}`);

            //Change all values back for next survey
            $("#inputName").val("")
            $("#inputPhoto").val("")
            $(".custom-select").each(function () {
                $(this).val("Select an Option");
            });
        });
    } else {
        alert("Please be sure to fill in all forms and selectors");
    }
});