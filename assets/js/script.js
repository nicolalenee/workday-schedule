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
  // load tasks for the first time
  loadTasks();


  // button that captures the time and the text of the tasks then saves the data to the task array in local storage
  $(".saveBtn").on("click", function() {
    
    // capture  textarea text 
    var text = $(this).siblings("textarea").val();
    
    // grab timeblock hour
    var hour = $(this).offsetParent().attr("id");

    // get the index of the timeblock in the order of timeblocks
    var index = $(this).closest(".time-block").index();

    
    //store the task
    saveTasks();
    })
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
      var timeBlockEl = $("<div>")
      .addClass("time-block card mb-3 future")
      .attr("id", `${timeFormat}`)
      
    } else if (currentTime.isAfter(time) && currentTime < withinHour) {
      // present time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 present")
      .attr("id",`${timeFormat}`)
    
    } else if (currentTime.isAfter(time) && currentTime.isAfter(withinHour)) {
      // past time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 past")
      .attr("id", `${timeFormat}`)
    }


    // element variables
    var cardHeaderEl = $("<div>")
    .addClass("card-header rounded");

    var hourEl = $("<h1>")
    .addClass("block-hour")
    .text(`🕑 ${timeFormat}`);

    var cardBodyEl = $("<div>")
    .addClass("card-body");

    var formEl = $("<form>")
    .addClass("form-group d-flex justify-content-between")
    .attr("id", "task-form")

    var textAreaEl = $("<textarea>")
    .addClass("rounded w-75 mr-2 task-text form-control")
    .attr("placeholder", "✏️ Add a task here")
    .attr("id", "text-area");

    var saveBtnEl = $("<button>")
    .addClass("saveBtn form-control w-25")
    .attr("type", "button")
    .text("Save");
    
    //append elements to page
    formEl.append(textAreaEl, saveBtnEl)
    cardBodyEl.append(formEl);
    cardHeaderEl.append(hourEl);
    timeBlockEl.append(cardHeaderEl, cardBodyEl);
    $(".container").append(timeBlockEl);
  }
}


 // save tasks
 var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load tasks
var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if localStorage is empty, create a new object
  if (!tasks) {
    tasks = {
      hour: [],
      text: []
    }
  }
}