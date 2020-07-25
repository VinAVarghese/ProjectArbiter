$(document).ready(() => {
    // Form listener grabbing/storing values
    $("#search-form").on("submit", (event) => {
        event.preventDefault()
        const category = $("#category").val();
        const city = $("#queryBar").val()
        searchRecipyPuppy(title, ingredients)
    })

    // Need to send "title" and "ingredients" data server-side
    const searchRecipyPuppy = (title, ingredients) => {
        const searchData = {
            ingredients
        }
        $.ajax("/api/recipyPuppy", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            renderRecipyOption(option)
        })
    }

    const renderRecipyOption = (option) => {
        // queryBar validator
        if (option === "unknown" || option === undefined || option === null) {
            $("#queryBar").val("Not a valid search, please try again")
            $("#queryBar").attr("class", "error");
        } else
            $("#queryBar").attr("class", "errorFix");
        // Displaying random option details in a card
        const optionCard = $("<div>");
        optionCard.attr("class", "card");
        $("#centralDiv").append(optionCard);

        const optionHeader = $("<div>");
        optionHeader.attr("class", "card-divider");
        optionHeader.text(option.name);
        $(optionCard).append(optionHeader);

        const optionSection = $("<div>");
        optionSection.attr("class", "card-section");
        $(optionCard).append(optionSection);

        if (option.url !== null) {
            const h4Links = $("<h4>");
            h4Links.text("Link")
            $(optionSection).append(h4Links);
            const aTag = $("<a>");
            aTag.attr("href", option.url)
            aTag.text("RecipyPuppy")
            $(optionSection).append(aTag);
        }

        if (option.recipy_url !== null) {
            const aTag = $("<a>");
            aTag.attr("href", option.recipy_url)
            aTag.text("Recipy")
            $(optionSection).append(aTag);
        }
    }
})