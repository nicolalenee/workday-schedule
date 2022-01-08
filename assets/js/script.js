// variable that holds tasks that will be saved in local storage
var tasks = {};
var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24];
 var currentTime = moment().utc().local();

// display dynamic elements
$("document").ready(function() {
  // format date
  var date = moment().format('dddd, MMMM Do YYYY');
  // append to parent p
  $("#currentDay").append(date);
  // display the timeblocks
  displayTimeblock();
});


// display the timeblocks for each business hour
var displayTimeblock = function() {

  // loop that sets the hour variable and colors based on past, present, or future
  for (var i=0; i < businessHours.length; i++) {

    // set the time for the timeblock
    var time = moment.utc().local()
    .hour(businessHours[i])
    .minute(0)
    .milliseconds(0);


    // reformat to a string for display purposes
    var timeFormat = moment(time, 'MMMM Do YYYY, h:mm:ss A').format('h:mm A');

    //create element that makes up a timeblock in the present
    var timeBlock = $("<div>")
    .addClass("timeblock card bg-light mb-3");

    var cardHeader = $("<div>")
    .addClass("card-header");

    var cardTime = $("<h2>")
    .addClass("card-title text-dark mb-1")
    //set time to new variable
    .text(`🕑 ${timeFormat}`);

    var cardBody = $("<div>")
    .addClass("card-body");

    var taskName = $("<h3>")
    .addClass("card-subtitle mb-2 text-muted")
    .text("✏️ Click to enter a new task");

    var description = $("<p>")
    .addClass("card-text text-dark")
    .text("💬 Click to enter a description of the task");

    // variable that is nearly an hour after the timeblock start
    var withinHour = moment(time, "h:mm").add(59, 'minutes').add(59,"milliseconds");


    if (time.isAfter(currentTime) && withinHour.isAfter(currentTime)) {
      // if the current time is before the time on the schedule and before the end of that hour, it's a future timeblock
      console.log("this timeblock is in the future")
    } else if (currentTime.isAfter(time) && currentTime < withinHour) {
      // if the current time is after the time on the schedule and before the end of the next hour, it's a current timeblock
      console.log("this timeblock is the current timeblock")
    } else if (currentTime.isAfter(time) && currentTime.isAfter(withinHour)) {
      // if the current time is after the time on the schedule and after the end of that hour, it's a past timeblock
      console.log("this timeblock is in the past")

    }
    //append elements to page
    cardHeader.append(cardTime);
    cardBody.append(taskName, description)
    timeBlock.append(cardHeader, cardBody);
    $("#schedule").append(timeBlock);
  }
};