$(document).ready(() => {
    
    // Form listener grabbing/storing values
    $("#search-form").on("submit", (event) => {
        event.preventDefault()
        const category = $("#category").val();
        const city = $("#queryBar").val()
        searchZomato(category, city)
    })
    
    // Need to send "category" and "city" data server-side
    const searchZomato = (category, city) => {
        const searchData = {
            category,
            city
        }
        $.ajax("/api/zomato", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            renderZomatoOption(option)
        })
    }
    
    // Need to recieve "option" from server-side to render card
    const renderZomatoOption = (option) => {
        // queryBar validator
        if (data.similar.info[0].type == "unknown") {
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
    
        const h4Address = $("<h4>");
        h4Address.text("Address")
        $(optionSection).append(h4Address);
        const pTag = $("<p>");
        pTag.text(`${option.location.address}`)
        $(optionSection).append(pTag);
    
        if (option.url !== null) {
            const h4Link = $("<h4>");
            h4Link.text("Link")
            $(optionSection).append(h4Link);
            const aTag = $("<a>");
            aTag.attr("href", option.url)
            aTag.text("Zomato Page")
            $(optionSection).append(aTag);
        }
    
        if (option.menu_url !== null) {
            const aTag = $("<a>");
            aTag.attr("href", option.menu_url)
            aTag.text("Menu")
            $(optionSection).append(aTag);
        }
    }

})

