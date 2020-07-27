$(document).ready(() => {

    // Click listener grabbing/storing values
    $(".spontaneousSearchBtn").on("click", (event) => {
        event.preventDefault();
        const city = $("#input").val()
        if ($("#selectCategory").val() === "Event") {
            searchTicketmaster(city)
        }
    })

    // Enter-Key listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
            event.preventDefault()
            const city = $("#input").val();
            if ($("#selectCategory").val() === "Event") {
                searchTicketmaster(city)
            }
        }
    })
    
    // FUNCTION: Sending "city" data server-side for axios
    const searchTicketmaster = (city) => {
        const searchData = {
            city,
        }
        $.ajax("/api/ticketmaster", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            // Input validator
        if (option === "unknown" || option === undefined || option === null || option === "") {
            $("#input").val("Not a valid search, please try again")
            $("#input").attr("class", "error");
        } else
            $("#input").attr("class", "errorFix");
            $(".index-background").empty();
            renderTicketmasterOption(option)
        })
    }
    
    // FUNCTION: Displaying random option details in a card
    const renderTicketmasterOption = (option) => {
        const optionCard = $("<div>");
        optionCard.attr("class", "card");
        $(".index-background").append(optionCard);
    
        const optionHeader = $("<div>");
        optionHeader.attr("class", "card-divider");
        optionHeader.text(`${option.name} (${option._embedded.venues[0].name})`);
        $(optionCard).append(optionHeader);

        if (option.images[0].url !== null) {
            const imgTag = $("<img>");
            imgTag.attr("src", option.images[0].url);
            imgTag.css({
                "margin":"0px",
                "width":"500px",
                "height":"auto"
            });
            $(optionHeader).after(imgTag);
        }
    
        const optionSection = $("<div>");
        optionSection.attr("class", "card-section");
        $(optionCard).append(optionSection);
    
        if (option.dates.start.localDate !== null) {
            const h4Date = $("<h4>");
            h4Date.text("Date")
            $(optionSection).append(h4Date);
            const DateTag = $("<p>");
            DateTag.text(option.dates.start.localDate)
            $(optionSection).append(DateTag);
        }

        if (option.url !== null) {
            const h4Links = $("<h4>");
            h4Links.text("More Information")
            $(optionSection).append(h4Links);
            const ticketmasterTag = $("<a>");
            ticketmasterTag.attr("href", option.url)
            ticketmasterTag.attr("class", "aPurpGrey")
            ticketmasterTag.attr("target", "_blank")
            ticketmasterTag.text("Ticketmaster")
            $(optionSection).append(ticketmasterTag);
        }

        const favBtn = $("<button>")
        favBtn.attr("class", "button spontaneousSearchBtn cell")
        favBtn.attr("id", "saveFavEvent")
        favBtn.text("Add To Favorites")
        $(optionCard).after(favBtn)

        // Font Awesome Bug To Fix
        // const heartIcon = $("<i>")
        // heartIcon.attr("class","fas fa-heart")
        // favBtn.append(heartIcon)
        listenToAddFav(option.name, option.dates.start.localDate)
    }

    // FUNCTION: Add to favorites
    const listenToAddFav = (name, date) => {
        $("#saveFavEvent").on("click", (event) => {
            event.preventDefault()
            const favTitle = {
                title: `${name} (${date})`
            }
            $.ajax("/fav/", {
                type: "POST",
                data: favTitle
            }).done((data) => {
                console.log("Favorite saved: " + data);
                $("#saveFavEvent").text("ADDED")
            }).fail((err) => {
                console.log(err);
                $("#saveFavEvent").text("Please Log In First")
            })
        });
    }


})    
