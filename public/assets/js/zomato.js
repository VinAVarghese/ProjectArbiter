$(document).ready(() => {

    // Click listener grabbing/storing values
    $(".spontaneousSearchBtn").on("click", (event) => {
        event.preventDefault();
        // const category = $("#meal").val();
        const city = $("#input").val()
        if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "Nightlife" || $("#selectCategory").val() === "Bar") {
            searchZomato(city)
        }
    })

    // Enter-Key listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
            event.preventDefault()
            // const category = $("#meal").val();
            const city = $("#input").val();
            if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "Nightlife" || $("#selectCategory").val() === "Bar") {
                searchZomato(city)
            }
        }
    })

    // Sending "city" data server-side
    const searchZomato = (city) => {
        const searchData = {
            // meal,
            city
        }
        $.ajax("/api/zomato", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            // Input validator
            if (option === "unknown" || option === undefined || option === null || option === "") {
                $("#input").val("Not a valid example, please try again")
                $("#input").attr("class", "error");
            } else {
                $("#input").attr("class", "errorFix");
                $(".index-background").empty();
                renderZomatoOption(option)
            }
        })
    }

    // FUNCTION: Render option card
    const renderZomatoOption = (option) => {
        const optionCard = $("<div>");
        optionCard.attr("class", "card");
        $(".index-background").append(optionCard);

        const optionHeader = $("<div>");
        optionHeader.attr("class", "card-divider");
        optionHeader.text(`${option.name} (${option.cuisines})`);
        $(optionCard).append(optionHeader);

        const optionSection = $("<div>");
        optionSection.attr("class", "card-section");
        $(optionCard).append(optionSection);

        const h4Address = $("<h4>");
        h4Address.text("Address")
        $(optionSection).append(h4Address);
        const pTag = $("<p>");
        pTag.text(`${option.location.address}`)
        $(optionSection).append(pTag);

        if (option.url !== null) {
            const h4Link = $("<h4>");
            h4Link.text("Links")
            $(optionSection).append(h4Link);
            const aTag = $("<a>");
            aTag.attr("href", option.url)
            aTag.text("\n|\nZomato Page")
            $(optionSection).append(aTag);
        }

        if (option.menu_url !== null) {
            const aTag2 = $("<a>");
            aTag2.attr("href", option.menu_url)
            aTag2.text("\n|\nMenu")
            $(optionSection).append(aTag2);
        }

        if (option.featured_image !== null) {
            const imgTag = $("<img>");
            imgTag.attr("src", option.featured_image);
            imgTag.css({
                "margin":"0px",
                "width":"500px",
                "height":"auto"
            });
            $(optionHeader).after(imgTag);
        }
        
        const favBtn = $("<button>")
        favBtn.attr("class", "button spontaneousSearchBtn cell")
        favBtn.attr("id", "saveFavZom")
        favBtn.text("Add To Favorites")
        $(optionCard).after(favBtn)

        // Font Awesome Bug To Fix
        // const heartIcon = $("<i>")
        // heartIcon.attr("class","fas fa-heart")
        // favBtn.append(heartIcon)
        listenToAddFav(option.establishment[0], option.name)
    }

    // FUNCTION: Add to favorites
    const listenToAddFav = (establishment, name) => {
        $("#saveFavZom").on("click", (event) => {
            event.preventDefault()
            const favTitle = {
                title: `${establishment}: ${name}`
            }
            $.ajax("/fav/", {
                type: "POST",
                data: favTitle
            }).done((data) => {
                console.log("Favorite saved: " + data);
                $("#saveFavZom").text("ADDED")
            }).fail((err) => {
                console.log(err);
                $("#saveFavZom").text("Please Log In First")
            })
        });
    }

})

