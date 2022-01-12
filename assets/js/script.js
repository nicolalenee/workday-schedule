
// variable that holds tasks that will be saved in local storage
var tasks = {};
var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
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
  // when reset button is clicked, all tasks will be removed from the localStorage
  $("#reset").on("click", resetLocalStorage);
  // when save button is clicked, task information is collected
  $(".saveBtn").on("click", captureTaskInfo)
});


// display the timeblocks for each business hour
var displayTimeblock = function(hour, text) {

  // loop that sets the hour variable and colors based on past, present, or future
  for (var i=0; i < businessHours.length; i++) {

    // set the time for the timeblock
    var time = moment.utc().local()
    .hour(businessHours[i])
    .minute(0)
    .milliseconds(0);

    // reformat to a string for display purposes
    var hour = moment(time, 'MMMM Do YYYY, h:mm:ss A').format('h:mm A');
    // variable that is nearly an hour after the timeblock start
    var withinHour = moment(time, "h:mm").add(59, 'minutes').add(59,"milliseconds");

  
    // loop that styles timeblock based on past, present, or futuree
    if (time.isAfter(currentTime) && withinHour.isAfter(currentTime)) {
      // future time block
      var timeBlockEl = $("<div>")
      .addClass("time-block card mb-3 future")
      .attr("id", `${hour}`)
      
    } else if (currentTime.isAfter(time) && currentTime < withinHour) {
      // present time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 present")
      .attr("id",`${hour}`)
    
    } else if (currentTime.isAfter(time) && currentTime.isAfter(withinHour)) {
      // past time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 past")
      .attr("id", `${hour}`)
    }


    // element variables
    var cardHeaderEl = $("<div>")
    .addClass("card-header rounded");

    var hourEl = $("<h1>")
    .addClass("block-hour")
    .text(`🕑 ${hour}`);

    var cardBodyEl = $("<div>")
    .addClass("card-body");

    var formEl = $("<form>")
    .addClass("form-group d-flex justify-content-between")
    .attr("id", "task-form")

    var textAreaEl = $("<textarea>")
    .addClass("rounded w-75 mr-2 task-text form-control")
    .attr("placeholder", "✏️ Add a task here")
    .attr("id", "text-area")
    .text(text);

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
    tasks = {hour:[]}
  }
  // TODO: for each task, display information that is saved in local storage
  $.each(tasks, function(hour,text) {
    displayTimeblock(hour,text);
  })
}

// function to reset localStorage data on 
var resetLocalStorage = function() {
  // clear tasks array
  tasks ={};
  // remove contents from localStorage
  localStorage.clear();

  // remove tasks from the page and replace with a blank text area
  var taskText = $(this).parent().siblings(".container").children(".time-block").children(".card-body").children("#task-form").children("h2");
  var newTextArea = $("<textarea>")
  .addClass("rounded w-75 mr-2 task-text form-control")
  .attr("placeholder", "✏️ Add a task here")
  .attr("id", "text-area")
  .text("");
  taskText.replaceWith(newTextArea);

};

// function that captures the time and text contents of each task
var captureTaskInfo = function(hour, text) {
  // capture  textarea text 
  var text = $(this).siblings("textarea").val();
    
  // grab timeblock hour
  var hour = $(this).offsetParent().attr("id");
  
  // push information to tasks array
  tasks[hour] = text;
  //store the task
  saveTasks();

  var taskSpan = $("<h2>")
  .addClass("font-weight-bold")
  .text(`✅ ${text}`)

  // replace input with span element
  $(this).siblings("textarea").replaceWith(taskSpan);
}

//  make task elements available to be updated upon click
$(".container").on("click","h2", function() {
  // create new textarea
  var newTextArea = $("<textarea>")
  .addClass("rounded w-75 mr-2 task-text form-control")
  .attr("placeholder", "✏️ Add a task here")
  .attr("id", "text-area")
  .text($(this).text().replace("✅", "").trim());
  // replace with new information
  $(this).replaceWith(newTextArea);
})

