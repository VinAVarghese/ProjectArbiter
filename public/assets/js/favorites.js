$(document).ready(() => {

    // Listeners: Notes and Delete Buttons
    $(".favNotesBtn").on("click", function (event) {
        event.preventDefault();
        const favId = $(this).attr("data-id")
        location.href = `/fav/${favId}`;
    })

    $(".favDeleteBtn").on("click", function (event) {
        event.preventDefault();
        const delId = $(this).attr("data-id")
        $.ajax(`/fav/${delId}`, {
            type: "DELETE",
        }).then((option) => {
            location.reload();
        })
    })

    // Listener: Confirm Edit (favorite_edit page)
    $("#saveNotesBtn").on("click", function (event) {
        event.preventDefault();
        const favId = $(this).attr("data-id")
        confirmEdit(favId)
        $("#saveIcon").attr("class", "fas fa-save")
    })

    const confirmEdit = (favId) => {
        const title = $(".favTitleEdit").val();
        const note = $(".favNoteEdit").val();

        const editData = {
            title,
            note
        }
        $.ajax(`/fav/${favId}`, {
            type: "PUT",
            data: editData
        }).then((option) => {
            location.reload();
        })
    }

})