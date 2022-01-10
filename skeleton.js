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
var displayTimeblock = function(taskTime, taskText) {

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
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 future block-group");
      
    } else if (currentTime.isAfter(time) && currentTime < withinHour) {
      // present time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 present block-group");
    
    } else if (currentTime.isAfter(time) && currentTime.isAfter(withinHour)) {
      // past time block
      var timeBlockEl = $("<div>").addClass("time-block card mb-3 past block-group");
    }


    // element variables
    var cardHeaderEl = $("<div>").addClass("card-header rounded");
    var hourEl = $("<h1>").addClass("block-hour").text(`🕑 ${timeFormat}`);
    var cardBodyEl = $("<div>").addClass("card-body flex-column justify-content-between");
    var descriptionEl = $("<p>").addClass("description font-italic font-weight-bold").text("✏️ Enter or edit a task below")
    var textAreaEl = $("<textarea>").addClass("rounded align-middle w-75 mr-2 taskText block-group-item").text("");
    var saveBtnEl = $("<button>").addClass("saveBtn align-middle").text("Save");
    

    //append elements to page
    cardBodyEl.append(textAreaEl, saveBtnEl);
    cardHeaderEl.append(hourEl, descriptionEl);
    timeBlockEl.append(cardHeaderEl, cardBodyEl);
    $("#schedule").append(timeBlockEl);

  }
}

// editing the text in exisiting tasks
$(".block-group").on("change", "input[type='text']", function() {
  // get current text
  var text = $(this).val().trim()

  // get the parent div's id attribute
})


// TODO: change from text area to <p> element after we create a function that saves the text
$(".block-group").on("click", "textarea", function() {
  // gt current text that's already in the text box
  var text = $(this).text().trim();

  // create new input element
  var textInput = $("<input>").attr("type", "text").addClass("form-control").val(text);

  // replace with new text
  $(this).replaceWith(textInput);
})

// save button in task div was clicked
$(".block-group .saveBtn").click(function() {
  // get form values
  var taskTime = $(".block-hour").val();
  var taskText = $(".block-group-item").val();

  if (taskText) {
    displayTimeblock(taskTime, taskText);

    // save in tasksArray
    tasks.push({
      time: taskTime,
      task: taskText
    });
    saveTasks();
  }
});

// function to load tasks
var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  // if localStorage is empty, create a new object to track all of the task arrays
  if (!tasks) {
    tasks ={
      time: [],
      task: []
    }
  };

  // loop over the properties of the tasks object
  $.each(tasks, function(arr) {
    //then loop over each inner array
    arr.forEach(function(task) {
      displayTimeblock(task.time, task.task);
    })
  })
};


// function to save tasks to the tasks array
var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


// remove all tasks from the page
$("#remove-tasks").on("click", function() {
  for (var key in tasks) {
    tasks[key].length = 0;
    $("#taskNumber" + key).empty();
  }
  saveTasks();
});

// TODO: timed interval that refreshes the page


// load up the tasks for the first time
loadTasks();



