$(document).ready(() => {

    // Search Page JS // 
    $("#selectCategory").change((event) => {
        if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "Nightlife" || $("#selectCategory").val() === "Bar" || $("#selectCategory").val() === "Event") {
            $("#input").attr("placeholder", "Enter Your City")
        } else {
            $("#input").attr("placeholder", `Enter A Favorite Example`)
        }
    });

})