$(document).ready(() => {
    //  $.ajax("https://developers.zomato.com/api/v2.1/establishments?city_id=280",{
    //     type : 'GET',
    //     headers: {
    //         "user-key":" e67072ffec13f1c95781c11c4b394576","Accept": "application/json"},
    //     contentType: "application/json",
    //  })
    //   .done(function(data){
    //       console.log(data);
    //   });
    // A function for saving a note to the db
const saveNote = (note) => {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST",
    });
  };

  // Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function () {
    console.log("note is saving")
    const newNote = {
      title: $(".title").val(),
      note: $(".note").val(),
    };
    console.log(newNote)
  
    // saveNote(newNote).then(() => {
    //   getAndRenderNotes();
    //   renderActiveNote();
    // });
  };

  $("#submit-fav").on("click", (event)=>{
      handleNoteSave();

  });

    // Search Page JS
    $("#selectCategory").on("click", (event) => {
        if ($("#category").val() === "Restaurant" || $("#category").val() === "Nightlife" || $("#category").val() === "Bar") {
            $("#input").attr("placeholder", "Enter Your City")
        } else {
            let category = $("#category").val()
            $("#input").attr("placeholder", `Enter A Favorite Example`)
        }
    })

    // Log In Page JS
    $("#currentUser").hide()
      //Event Listener to handle hiding the signup form if the user is an existing user. 
      $("#login").click(function(){
        $("#registration").hide();
        $("#currentUser").show();
      });
      
      
      $("#currentUser").submit(function(event){
          event.preventDefault();
          const userObj = {
              email:$("#userEmail").val(),
              password:$("#userPass").val()
          }
          $.ajax({
              url:"", //Add in once auth controllers are set up. 
              method:"POST",
              data: userObj
          }).done(function(data){
              console.log(data);
              location.href = "/favorites"
          }).fail(function(err){
              console.log(err);
              location.reload();
          })
      })
      
      $("#registration").submit(function(event){
          event.preventDefault();
          const userObj = {
              name:$("#newName").val(),
              email:$("#newEmail").val(),
              password:$("#newPassword").val()
          }
          $.ajax({
              url:"", //Add in once auth controllers are set up.
              method:"POST",
              data: userObj
          }).done(function(data){
              alert('Signed up successfully')
              location.href = "/login"
          }).fail(function(err){
              console.log(err);
              location.reload();
          })
      })      
})