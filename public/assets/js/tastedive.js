$(document).ready(() => {
    
    // Form listener grabbing/storing values
    $("#search-form").on("submit", (event) => {
        event.preventDefault()
        const type = $("#category").val();
        const q = $("#input").val()
        searchTasteDive(type, q)
    })

    // Form listener grabbing/storing values
    $("#input").keyup((event) => {
        if (event.which == 13) {
        const type = $("#category").val();
        const q = $("#input").val()
        searchTasteDive(type, q)
        alert("hi")
        }
    })
    
    // Sending "type" and "q" data server-side
    const searchTasteDive = (type, q) => {
        const searchData = {
            type,
            q
        }
        $.ajax("/api/tastedive", {
            type: "POST",
            data: searchData,
        }).then((option) => {
            renderTasteDiveOption(option)
        })
    }
    
    const renderTasteDiveOption = (option) => {
        // inputs validator
        if (option === "unknown" || option === undefined || option === null) {
            $("#input").val("Not a valid search, please try again")
            $("#input").attr("class", "error");
        } else {
            $("#input").attr("class", "errorFix");
            $(".index-background").empty();

            // Displaying random option details in a card
            const optionCard = $("<div>");
            optionCard.attr("class", "card");
            $(".index-background").append(optionCard);
            
            const optionHeader = $("<div>");
            optionHeader.attr("class", "card-divider");
            optionHeader.text(option.name);
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
            
            if (option.wUrl !== null) {
                const h4Links = $("<h4>");
                h4Links.text("Links")
                $(optionSection).append(h4Links);
                const aWikiTag = $("<a>");
                aWikiTag.attr("href", option.wUrl)
                aWikiTag.text("Wikipedia")
                $(optionSection).append(aWikiTag);
            }
            
            if (option.yUrl !== null) {
                const h4YTube = $("<h4>");
                h4YTube.text("YouTube")
                $(optionSection).append(h4YTube);
                const aWikiTag = $("<a>");
                aWikiTag.attr("href", option.yUrl)
                aWikiTag.text("Preview")
                $(optionSection).append(aWikiTag);
            }
        }
    }

})    

