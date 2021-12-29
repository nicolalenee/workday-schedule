// variable that holds tasks that will be saved in local storage
var tasks = {};

// display date on ready
$("document").ready(function() {
  // define date
  var date = moment().format('dddd, MMMM Do YYYY');
  // append to parent p
  $("#currentDay").append(date);
});