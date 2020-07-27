$(document).ready(() => {

    // Click listener grabbing/storing values
    $(".spontaneousSearchBtn").on("click", (event) => {
        event.preventDefault();
        
        const ingredients = $("#input").val()
        if ($("#selectCategory").val() === "Recipe") {
            searchRecipePuppy(ingredients)
        }
    })

    // Enter-Key listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
            event.preventDefault()
            const ingredients = $("#input").val();
            if ($("#selectCategory").val() === "Recipe") {
                searchRecipePuppy(ingredients)
            }
        }
    })

    // FUNCTION: Send "ingredients" data server-side
    const searchRecipePuppy = (ingredients) => {
        const searchData = {
            ingredients
        }
        $.ajax("/api/recipepuppy", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            console.log("frontend option: " + option);
            // Input validator
            if (option === "unknown" || option === undefined || option === null || option === "") {
                $("#input").val("Not a valid search, please try again")
                $("#input").attr("class", "error");
            } else
                $("#input").attr("class", "errorFix");
                $(".index-background").empty();
                renderRecipeOption(option)
        })
    }

    // Saving IMG Path: For card image
    const imgArray = ["/assets/images/alyson-mcphee-yWG-ndhxvqY-unsplash.jpg","/assets/images/soroush-karimi-Mx5kwvzeGC0-unsplash.jpg", "/assets/images/katie-smith-uQs1802D0CQ-unsplash.jpg", "/assets/images/edgar-castrejon-bG5rhvRH0JM-unsplash.jpg", "/assets/images/max-delsid-81QFH8r4xog-unsplash.jpg", "/assets/images/toa-heftiba-oQvESMKUkzM-unsplash.jpg", "/assets/images/jesus-terres-tUsnpRj0NYE-unsplash.jpg", "/assets/images/aaron-thomas-KYIHEnHjwzo-unsplash.jpg"]
    const randomNum = Math.floor(Math.random() * imgArray.length);
    const img = imgArray[randomNum]

    // FUNCTION: Displaying random option details in a card
    const renderRecipeOption = (option) => {
        const optionCard = $("<div>");
        optionCard.attr("class", "card");
        $(".index-background").append(optionCard);

        const optionHeader = $("<div>");
        optionHeader.attr("class", "card-divider");
        optionHeader.text(option.title);
        $(optionCard).append(optionHeader);

        const optionSection = $("<div>");
        optionSection.attr("class", "card-section");
        $(optionCard).append(optionSection);

        if (option.thumbnail !== null) {
            const imgTag = $("<img>");
            imgTag.attr("src", `${img}`);
            imgTag.css({
                "margin":"0px",
                "width":"500px",
                "height":"auto"
            });
            $(optionHeader).after(imgTag);
        }

        if (option.href !== null) {
            const h4Links = $("<h4>");
            h4Links.text("Link")
            $(optionSection).append(h4Links);
            const aTag = $("<a>");
            aTag.attr("href", option.href)
            aTag.attr("class", "aPurpGrey")
            aTag.attr("target", "_blank")
            aTag.text("Recipe")
            $(optionSection).append(aTag);
        }

        const favBtn = $("<button>")
        favBtn.attr("class", "button spontaneousSearchBtn cell")
        favBtn.attr("id", "saveFavRecipe")
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
        $("#saveFavRecipe").on("click", (event) => {
            event.preventDefault()
            const favTitle = {
                title:`${type}: ${title}`
            }
            $.ajax("/fav/", {
                type: "POST",
                data: favTitle
            }).done((data) => {
                console.log("Favorite saved: " + data);
                $("#saveFavRecipe").text("ADDED")
            }).fail((err) => {
                console.log(err);
                $("#saveFavRecipe").text("Please Log In First")
            })
        });
    }

})