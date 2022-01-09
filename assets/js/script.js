// variable that holds tasks that will be saved in local storage
var tasks = {};
var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
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
    // variable that is nearly an hour after the timeblock start
    var withinHour = moment(time, "h:mm").add(59, 'minutes').add(59,"milliseconds");

  
    // loop that styles timeblock based on past, present, or futuree
    if (time.isAfter(currentTime) && withinHour.isAfter(currentTime)) {
      // future time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 future");
      
    } else if (currentTime.isAfter(time) && currentTime < withinHour) {
      // present time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 present");
    
    } else if (currentTime.isAfter(time) && currentTime.isAfter(withinHour)) {
      // past time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 past");
    }


    // element variables
    var cardHeaderEl = $("<div>").addClass("card-header rounded mb-1");
    var hourEl = $("<h1>").text(`🕑 ${timeFormat}`);
    var cardBodyEl = $("<div>").addClass("card-body flex-column justify-content-between");
    var textAreaEl = $("<textarea>").addClass("rounded align-middle w-75 mr-2").text("✏️ Add a new event");
    var saveBtnEl = $("<button>").addClass("saveBtn align-middle").text("Save");
    

    //append elements to page
    cardBodyEl.append(textAreaEl, saveBtnEl);
    cardHeaderEl.append(hourEl);
    timeBlockEl.append(cardHeaderEl, cardBodyEl);
    $("#schedule").append(timeBlockEl);

  }
}