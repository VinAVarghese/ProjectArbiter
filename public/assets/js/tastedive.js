$(document).ready(() => {

    // Click listener grabbing/storing values
    $(".spontaneousSearchBtn").on("click", (event) => {
        event.preventDefault();
        const type = $("#selectCategory").val();
        const q = $("#input").val()
        if ($("#selectCategory").val() === "author" || $("#selectCategory").val() === "movie" || $("#selectCategory").val() === "show" || $("#selectCategory").val() === "music" || $("#selectCategory").val() === "game") {
            searchTasteDive(type, q)
        }
    })

    // Enter-Key listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
            event.preventDefault()
            const type = $("#selectCategory").val()
            const q = $("#input").val();
            if ($("#selectCategory").val() === "author" || $("#selectCategory").val() === "movie" || $("#selectCategory").val() === "show" || $("#selectCategory").val() === "music" || $("#selectCategory").val() === "game") {
                searchTasteDive(type, q)
            }
        }
    })

    // FUNCTION: Sending "type" and "q" data server-side
    const searchTasteDive = (type, q) => {
        const searchData = {
            type,
            q
        }
        $.ajax("/api/tastedive", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            console.log(option);
            // Input validator
            if (option === "unknown" || option === undefined || option === null || option === "") {
                $("#input").val("Not a valid example, please try again")
                $("#input").attr("class", "error");
            } else {
                $("#input").attr("class", "errorFix");
                $(".index-background").empty();
                renderTasteDiveOption(option)
            }
        })
    }

    // FUNCTION: Displaying random option details in a card
    const renderTasteDiveOption = (option) => {
        const optionCard = $("<div>");
        optionCard.attr("class", "card");
        optionCard.attr("id", "card-option");
        $(".index-background").append(optionCard);

        const optionHeader = $("<div>");
        optionHeader.attr("class", "card-divider");
        optionHeader.text(option.Name);
        $(optionCard).append(optionHeader);

        const optionSection = $("<div>");
        optionSection.attr("class", "card-section");
        $(optionCard).append(optionSection);

        if (option.wTeaser !== null) {
            const h4About = $("<h4>");
            h4About.text("About")
            $(optionSection).append(h4About);
            const pAbout = $("<p>");
            pAbout.text(option.wTeaser)
            $(optionSection).append(pAbout);
        }

        if (option.yUrl !== null) {
            const h4YTube = $("<h4>");
            h4YTube.text("YouTube")
            $(optionSection).append(h4YTube);
            const iframe = $("<iframe>");
            iframe.attr("src", option.yUrl)
            iframe.attr("title", "preview")
            iframe.attr("width", "100%")
            iframe.attr("height", "450")
            $(optionSection).append(iframe);
        }

        const favBtn = $("<button>")
        favBtn.attr("class", "button spontaneousSearchBtn cell")
        favBtn.attr("id", "saveFav")
        favBtn.text("Add To Favorites")
        $(optionCard).after(favBtn)

        // Font Awesome Bug To Fix
        // const heartIcon = $("<i>")
        // heartIcon.attr("class","fas fa-heart")
        // favBtn.append(heartIcon)
        listenToAddFav(option.Type, option.Name)
    }

    // FUNCTION: Add to favorites
    const listenToAddFav = (type, title) => {
        $("#saveFav").on("click", (event) => {
            event.preventDefault()
            const favTitle = {
                title:`${type}: ${title}`
            }
            $.ajax("/fav/", {
                type: "POST",
                data: favTitle
            }).done((data) => {
                console.log("Favorite saved: " + data);
                $("#saveFav").text("ADDED")
            }).fail((err) => {
                console.log(err);
                $("#saveFav").text("Please Log In First")
            })
        });
    }

})

