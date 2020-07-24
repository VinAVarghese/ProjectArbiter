// Form listener grabbing/storing values
$("#search-form").on("submit", (event) => {
    event.preventDefault()
    const type = $("#category").val();
    const city = $("#queryBar").val()
    searchTicketmaster(city)
})

// Sending "city" data server-side
const searchTicketmaster = (city) => {
    const searchData = {
        city,
    }
    $.ajax("/api/ticketmaster", {
        city: "POST",
        data: searchData,
    }).then((option) => {
        renderTicketmasterOption(option)
    })
}

const renderTicketmasterOption = (option) => {
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
        const ticketmasterTag = $("<a>");
        ticketmasterTag.attr("href", option.url)
        ticketmasterTag.text("Ticketmaster")
        $(optionSection).append(ticketmasterTag);
    }
}

