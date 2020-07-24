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

    if (option.name !== null) {
        const h4About = $("<h4>");
        h4About.text("About")
        $(optionSection).append(h4About);
        const pAbout = $("<p>");
        pAbout.text(option.name)
        $(optionSection).append(pAbout);
    }
//need change
    // if (option.url !== null) {
    //     const h4Links = $("<h4>");
    //     h4Links.text("Links")
    //     $(optionSection).append(h4Links);
    //     const aWikiTag = $("<a>");
    //     aWikiTag.attr("href", option.url)
    //     aWikiTag.text("Wikipedia")
    //     $(optionSection).append(aWikiTag);
    // }

    // if (option.location.address.city !== null) {
    //     const h4YTube = $("<h4>");
    //     h4YTube.text("YouTube")
    //     $(optionSection).append(h4YTube);
    //     const aWikiTag = $("<a>");
    //     aWikiTag.attr("href", option.yUrl)
    //     aWikiTag.text("Preview")
    //     $(optionSection).append(aWikiTag);
    // }
}
