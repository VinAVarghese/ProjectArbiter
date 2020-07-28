$(document).ready(() => {

    // Listeners: Log Out and Delete Account Buttons
    $(".logOutBtn").on("click", function (event) {
        event.preventDefault();
        $.ajax("/logout",{
            type:"GET"
        }).then((res) =>{
            location.href = `/`;
        })
    })

    $(".deleteAcctBtn").on("click", function (event) {
        event.preventDefault();
        const delId = $(this).attr("data-id")
        $.ajax(`/user/${delId}`, {
            type: "DELETE",
        }).then((option) => {
            location.href = "/login"
        })
    })

    $("#editUserBtn").on("click", function (event) {
        event.preventDefault();
        const userId = $(this).attr("data-id")
        const editUserData = {
            email: $("#newEmail").val()
        }
        $.ajax(`/user/${userId}`, {
            type: "PUT",
            data: editUserData
        }).then((option) => {
            $("#saveIcon").attr("class", "fas fa-save")
            location.reload();
        })
    })

})