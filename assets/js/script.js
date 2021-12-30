// variable that holds tasks that will be saved in local storage
var tasks = {};
var businessHours = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 AM", "5:00 PM"];

// display date when doc is loaded
$("document").ready(function() {
  // define date
  var date = moment().format('dddd, MMMM Do YYYY');
  // append to parent p
  $("#currentDay").append(date);
});


var displayTimeblock = function() {
  //create element that makes up a timeblock
  var timeBlock = $("<div>")
  .addClass("timeblock card bg-light mb-3");

  var cardBody = $("<div>")
  .addClass("card-body");


  var cardTime = $("<h5>")
  .addClass("card-title text-dark mb-4")
  .text("8:00 AM");

  var taskName = $("<h6>")
  .addClass("card-subtitle mb-2 text-muted")
  .text("task name");

  var description = $("<p>")
  .addClass("card-text text-dark")
  .text("this is a description");

  //append contents to cardbody
  cardBody.append(cardTime, taskName, description)
  //append all content to timeblock
  timeBlock.append(cardBody);
  // append to schedule div
  $("#schedule").append(timeBlock);
}
$(document).on("click", displayTimeblock);