$(document).ready(() => {

    // Search Page JS
    $("#selectCategory").on("click", (event) => {
        if ($("#category").val() === "Restaurant" || $("#category").val() === "Nightlife" || $("#category").val() === "Bar") {
            $("#input").attr("placeholder", "Enter Your City")
        } else {
            let category = $("#category").val()
            $("#input").attr("placeholder", `Enter A Favorite Example`)
        }
    })

})