// variable that holds tasks that will be saved in local storage
var tasks = {};
var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// display date when doc is loaded
$("document").ready(function() {
  // define date
  var date = moment().format('dddd, MMMM Do YYYY');
  // append to parent p
  $("#currentDay").append(date);
});


// display the timeblocks for each business hour
var displayTimeblock = function() {

  // loop that sets the hour variable and colors based on past, present, or future
  for (var i=0; i < businessHours.length; i++) {
    var currentTime = moment().format("h:mm A");
    console.log("The current time is " + currentTime);
    var time = moment.utc()
    .hour(businessHours[i])
    .minute(0)
    .format("h:mm A");
    console.log("This time block is for  " + time);

    //TODO:add the if conditional that changes the color of the block depending on if it is past present or future to the current time

    //create element that makes up a timeblock in the present
    var timeBlock = $("<div>")
    .addClass("timeblock card bg-light mb-3");

    var cardBody = $("<div>")
    .addClass("card-body");

    var cardTime = $("<h5>")
    .addClass("card-title text-dark mb-4")
    //set time to new variable
    .text(time);

    var taskName = $("<h6>")
    .addClass("card-subtitle mb-2 text-muted")
    .text("Enter new task");

    var description = $("<p>")
    .addClass("card-text text-dark")
    .text("Enter a description of the task");

    //append contents to cardbody
    cardBody.append(cardTime, taskName, description)
    //append all content to timeblock
    timeBlock.append(cardBody);
    // append to schedule div
    $("#schedule").append(timeBlock);
  };
}

// on ready event handler
$(document).on("click", displayTimeblock);