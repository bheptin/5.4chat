$(document).ready(function() {
    var site =`https://fathomless-woodland-51903.herokuapp.com`;
    var name = prompt("Enter your chat name:", "Guest");

   // default name is 'Guest'
   if (!name || name === ' ') {
     name = "Bama";
   }

  // strip tags
  name = name.replace(/(<([^>]+)>)/ig,"");

  // display name on page
   $("#username").html(name);


var chatData = function(){
   $.getJSON({
     url: `${site}/messages`,
     headers: {
       "Authorization": "Token token=supadupasecret"
     },
     success: (response) => {
       var written = response.data.map((message) => `<li data-id=${message.id}> ${message.attributes.username} / ${message.attributes['created-at']}: ${message.attributes.text}</li>`);

       ///adding the server info to the todo ul
       $("#chatbox").append(written.join("\n"));

     }

   })
 };
   var intervalID = function() {
   window.setInterval(chatData, 20000);
   };
   intervalID();



$("form").submit(function(event){
  $.post({
    url: `${site}/messages`,
    headers: {
      "Authorization": "Token token=supadupasecret"
    },
    data: {message: {
      "username": "Bama",
      "text": $("textarea").val()}},
    success: function(response){
      $("#chatbox li:last").data(response.attributes);

    },
});

  var moreHTML = `<li>${$(this).find("textarea").val()}</li>`;
  $("#chatbox").append(moreHTML);
  event.preventDefault();

  $("textarea").val("");

});
})
