var config = {
    apiKey: "AIzaSyAt5k1uVs1NDgoAn01KPhDwDnN-A-QsW7U",
    authDomain: "shockdatabase-d8f4e.firebaseapp.com",
    databaseURL: "https://shockdatabase-d8f4e.firebaseio.com",
    projectId: "shockdatabase-d8f4e",
    storageBucket: "shockdatabase-d8f4e.appspot.com",
    messagingSenderId: "482688225509"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#afterSubmit").hide();


$("#submitInfo").on("click", function (event) {
    event.preventDefault();
    $(".container").hide();
    $("#afterSubmit").show();


    var fullName = $("#fullName").val().trim();
    var username = $("#username").val().trim();
    var dateMoment = moment().format("MM/DD/YY hh:mm A");
    var description = $("#description").val().trim();

    var walkinInfo = {
        fullName: fullName,
        username: username,
        dateMoment: dateMoment,
        description: description
    }

    database.ref().push(walkinInfo);

    $("#fullName").val("");
    $("#username").val("");
    $("#description").val("");

    var emailTI = "Name: " + fullName + "<br /> "+ "Username: " + username + "<br />" + "Date: " + dateMoment + "<br />" + "Description: " + description;

    var templateParams = {
        name: "Walkin_Admin",
        description: emailTI
    };

    emailjs.send('default_service', 'tester2626', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

})


$("#confirmButton").on("click", function (event) {
    $(".container").show();
    $("#afterSubmit").hide();
});

database.ref().on("child_added", function (child) {

    var fullNameInfo = child.val().fullName;
    var usernameInfo = child.val().username;
    var dateInfo = child.val().dateMoment;
    var descriptionInfo = child.val().description;

    var tBody = $("tbody");
    var tRow = $("<tr>");

    var fullNameInfoTd = $("<td>").text(fullNameInfo);
    var usernameInfoTd = $("<td>").text(usernameInfo);
    var dateInfoTd = $("<td>").text(dateInfo);
    var descriptionInfoTd = $("<td>").text(descriptionInfo);


    tRow.append(fullNameInfoTd, usernameInfoTd, dateInfoTd, descriptionInfoTd);
    tBody.append(tRow);

},




    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });