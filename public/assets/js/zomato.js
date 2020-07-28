$(document).ready(() => {

    // Click listener grabbing/storing values
    $(".spontaneousSearchBtn").on("click", (event) => {
        event.preventDefault();
        const estId = $("#selectCategory").val();
        const city = $("#input").val()
        if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "8" || $("#selectCategory").val() === "7") {
            searchZomato(city, estId)
        }
    })

    // Enter-Key listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
            event.preventDefault()
            // const category = $("#meal").val();
            const city = $("#input").val();
            if ($("#selectCategory").val() === "Restaurant" || $("#selectCategory").val() === "8" || $("#selectCategory").val() === "7") {
                searchZomato(city, estId)
            }
        }
    })

    // Sending "city" data server-side
    const searchZomato = (city, estId) => {
        const searchData = {
            estId,
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

    // Saving IMG Path: For card image if API doesn't have one
    const imgArray = ["/assets/images/adam-wilson-6UIonphZA5o-unsplash.jpg","/assets/images/michael-discenza-MxfcoxycH_Y-unsplash.jpg", "/assets/images/alexander-popov-2GNBoMgKYEo-unsplash.jpg", "/assets/images/louis-hansel-shotsoflouis-yLUvnCFI500-unsplash.jpg", "/assets/images/yutacar-JKMnm3CIncw-unsplash.jpg"]
    const randomNum = Math.floor(Math.random() * imgArray.length);
    const img = imgArray[randomNum]

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
            aTag.attr("class", "aPurpGrey")
            aTag.attr("target", "_blank")
            aTag.text("\n|\nZomato Page")
            $(optionSection).append(aTag);
        }

        if (option.menu_url !== null) {
            const aTag2 = $("<a>");
            aTag2.attr("href", option.menu_url)
            aTag2.attr("class", "aPurpGrey")
            aTag2.attr("target", "_blank")
            aTag2.text("\n|\nMenu")
            $(optionSection).append(aTag2);
        }

        if (option.featured_image !== '') {
            const imgTag = $("<img>");
            imgTag.attr("src", option.featured_image);
            imgTag.css({
                "margin":"0px",
                "width":"500px",
                "height":"auto"
            });
            $(optionHeader).after(imgTag);
        } else {
            const imgTag = $("<img>");
            imgTag.attr("src", img);
            imgTag.css({
                "margin":"0px",
                "width":"500px",
                "height":"auto"
            });
            $(optionHeader).after(imgTag);
        }
        
        const favBtn = $("<button>")
        favBtn.attr("class", "button heartBtn cell")
        favBtn.attr("id", "saveFavZom")
        const heartIcon = $("<i>")
        heartIcon.attr("class","far fa-heart")
        heartIcon.attr("id","heart")
        favBtn.append(heartIcon)
        // favBtn.text("Add To Favorites")
        $(optionCard).after(favBtn)

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
                $("#heart").attr("class","fas fa-heart")
                // $("#saveFavZom").text("ADDED")
            }).fail((err) => {
                console.log(err);
                $("#saveFavZom").text("Please Log In First")
            })
        });
    }

})

