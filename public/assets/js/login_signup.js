$(document).ready(() => {

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
    
    // Login Request
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
        }).done(function (user) {
            console.log(`Login Successful: Welcome`);
            location.href = `/user/${user.id}`
        }).fail(function (err) {
            console.log(err.responseText);
            if (err.responseText === "Account not found") {
                $("#userEmail").val("Email not found")
                $("#userPass").val("")
                $("#userEmail").attr("class", "error");
            } else if(err.responseText === "Incorrect password") {
                $("#userPass").attr("aria-describedby", "incorrectPass");
                const errP = $("<p>");
                errP.attr("id", "incorrectPass")
                errP.attr("class", "help-text")
                errP.text("Incorrect password, please try again")
                $("#passwordLabel").after(errP)
                $("#userPass").val("")
                $("#userPass").attr("class", "error");
            }
        })
    })

    // Sign Up Request
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
        }).done(function (user) {
            console.log('Signed up successfully')
            location.href = `/login`
        }).fail(function (err) {
            console.log(err);
            location.reload();
        })
    })

})