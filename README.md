# Work Day Scheduler

## Description
A web appliucation that allows a user to enter tasks every hour during normal business hours.
Tasks are color-coded to indicate whether the hour is in the past, present, or future.

## Technologies
- **jQuery** was used in this project to assist in dynamically creating elements, manipulating these elements, and traversing the DOM.
- **Boostrap** library was used to edit these elements' appearance with very little custom CSS.
- **Moment.js** was used to loop through business hours to display them on the page and to grab the current time to determine the appearance of the timeblocks based on past, present, or future.

## Features 
- *WHEN* the page is loaded, today's date will be displayed at the top of the page.
- *WHEN* a user enters a task into a timeblock, *THEN* they are able to save that information to the page and localStorage.
- *WHEN* a timeblock is in the past, present, or future, *THEN* it will be color-coded to indicate where in the mentioned categories it falls.
  - If a timeblock is in the past it will be grey.
  - If a timeblock is in the present (within the current hour) it will be red.
  - If a timeblock is in the future it will be green.
- *WHEN* a user clicks on the text of an existing task, *THEN* they are able to update the task and and re-save the task in localStorage.
- *WHEN* a user clicks the "RESET ALL" button, all the tasks are removed from the page and localStorage.

## Screenshots

![image](https://user-images.githubusercontent.com/86696492/149084386-5e172459-3243-4710-809a-a25607c75ad0.png)

![image](https://user-images.githubusercontent.com/86696492/149084430-2b0c02d9-4f6b-409f-9754-53e2889cceb8.png)


## Links 
Repository: https://github.com/nicolalenee/workday-schedule
Deployment: https://nicolalenee.github.io/workday-schedule/

