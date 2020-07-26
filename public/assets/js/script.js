$(document).ready(() => {

    // SEARCH PAGE JS // 
    // Listener: Assign correct placeholder content
    $("#selectCategory").change((event) => {
        if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "Nightlife" || $("#selectCategory").val() === "Bar" || $("#selectCategory").val() === "Event") {
            $("#input").attr("placeholder", "Enter Your City")
        } else {
            $("#input").attr("placeholder", `Enter A Favorite Example`)
        }
    });

    // LOGIN/SIGNUP PAGE JS //
    $("#registration").hide()
    // Listeners: Presenting Reg OR Sign up form
    $("#login").click(function () {
        $("#registration").hide();
        $("#currentUser").show();
    });
    $("#signup").click(function () {
        $("#registration").show();
        $("#currentUser").hide();
    });
    
    // Login Request NOT WORKING YET
    $("#loginBtn").on("click", (event) => {
        event.preventDefault();
        const userObj = {
            email: $("#userEmail").val(),
            password: $("#userPass").val()
        }
        $.ajax({
            url: "/auth/login",
            method: "POST",
            data: userObj
        }).done(function (data) {
            console.log(data);
            console.log("Welcome");
        }).fail(function (err) {
            console.log(err);
            console.log("something went wrong");
            location.reload();
        })
    })

    // Sign Up Request PASSED TESTING
    $("#signupBtn").on("click", (event) => {
        event.preventDefault();
        const userObj = {
            name: $("#newName").val(),
            email: $("#newEmail").val(),
            password: $("#newPassword").val()
        }
        $.ajax({
            url: "/auth/signup",
            method: "POST",
            data: userObj
        }).done(function (data) {
            console.log('Signed up successfully')
        }).fail(function (err) {
            console.log(err);
            location.reload();
        })
    })

})