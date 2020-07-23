// Listeners for click &/or keypress to start search/AJAX call
// $("#search").click(() => {
//     const type = $("#category").val().trim();
//     const q = $("#queryBar").val()
//     tasteDiveApi(type, q)
// })

// $("#queryBar").keydown(() => {
//     if (event.which == 13) {
//         const type = $("#category").val().trim();
//         const q = $("#queryBar").val()
//         tasteDiveApi(type, q)
//     }
// })


// // Function: AJAX call to TasteDive
// const tasteDiveApi = (type, q) => {
//     const apiKey = "e67072ffec13f1c95781c11c4b394576"
//     const queryURL = `https://zomato.com/api/similar?q=${type}:${q}&info=1&limit=100&k=${apiKey}`

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then((data) => {
//         if (err) throw err
//         console.log(data);
//         // queryBar validator 
//         if (data.similar.info[0].type == "unknown") {
//             $("#queryBar").val("Not a valid search, please try again")
//             $("#queryBar").attr("class", "error");
//         } else
//             $("#queryBar").attr("class", "errorFix");
//         // Selecting 1 random option/100 responses to display
//         const randomNum = Math.floor(Math.random() * 101);
//         const option = data.similar.results[randomNum]
//         // Displaying random option details in a card
//         const optionCard = $("<div>");
//         optionCard.attr("class", "card");
//         $("#centralDiv").append(optionCard);

//         const optionHeader = $("<div>");
//         optionHeader.attr("class", "card-divider");
//         optionHeader.text(option.name);
//         $(optionCard).append(optionHeader);

//         const optionSection = $("<div>");
//         optionSection.attr("class", "card-section");
//         $(optionCard).append(optionSection);

//         if (option.wTeaser !== null){
//             const h4About = $("<h4>");
//             h4About.text("About")
//             $(optionSection).append(h4About);
//             const pAbout = $("<p>");
//             pAbout.text(option.wTeaser)
//             $(optionSection).append(pAbout);
//         }
        
//         if (option.wUrl !== null){
//             const h4Links = $("<h4>");
//             h4Links.text("Links")
//             $(optionSection).append(h4Links);
//             const aWikiTag = $("<a>");
//             aWikiTag.attr("href", option.wUrl)
//             aWikiTag.text("Wikipedia")
//             $(optionSection).append(aWikiTag);
//         }

//         if (option.yUrl !== null){
//             const h4YTube = $("<h4>");
//             h4YTube.text("YouTube")
//             $(optionSection).append(h4YTube);
//             const aWikiTag = $("<a>");
//             aWikiTag.attr("href", option.yUrl)
//             aWikiTag.text("Preview")
//             $(optionSection).append(aWikiTag);
//         }
//     })
// }

