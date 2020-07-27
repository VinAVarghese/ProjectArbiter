$(document).ready(() => {

    // EVERY PAGE JS //
    // Top Link: Display and routing
    $.ajax({
        url: "/auth/readsession",
        method: "GET",
        data: "check"
    }).then((user)=>{
        if (user === "Not logged in"){
            $(".top-link").text("Log In")
            $(".top-link").attr("href",`/login`)
        } else{
            $(".top-link").text("User")
            $(".top-link").attr("href",`/user/${user.id}`)
        }
    })

    // SEARCH PAGE JS // 
    // Listener: Assign correct placeholder content
    $("#selectCategory").change((event) => {
        if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "Nightlife" || $("#selectCategory").val() === "Bar" || $("#selectCategory").val() === "Event") {
            $("#input").attr("placeholder", "Enter Your City")
        } else if ($("#selectCategory").val() === "Recipe"){
            $("#input").attr("placeholder", "Enter Ingreidents You Have")
        } else if ($("#selectCategory").val() === ""){
            $("#input").attr("placeholder", "")
        } else {
            $("#input").attr("placeholder", `Enter A Favorite Example`)
        }
    });

})