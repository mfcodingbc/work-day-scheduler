// this variable stores an array with every hour and event
var timeBlocks = {};

// this variable selects all timeblocks(rows)
var timeBlocksSections = document.querySelectorAll('.row');
    for (var i = 0; i < timeBlocksSections.length; i++)
        timeBlocksSections[i].id = 'row-' + i;

// create and set ids for all hours
var timeBlocksHourEl = document.querySelectorAll('.hour');
    for (var i = 0; i < timeBlocksHourEl.length; i++)
        timeBlocksHourEl[i].id = 'hour-' + i;

// create and set ids for all events per hour
var timeBlocksEventEl = document.querySelectorAll('.col-10');
    for (var i = 0; i < timeBlocksEventEl.length; i++)
        timeBlocksEventEl[i].id = 'event-' + i;

// create and set ids for all save buttons
var timeBlocksSaveEl = document.querySelectorAll('.saveBtn');
    for (var i = 0; i < timeBlocksSaveEl.length; i++)
        timeBlocksSaveEl[i].id = 'saveBtn-' + i;

// adding current times with Moment.js
var currentDayEl = document.querySelector("#currentDay");

// current Day (no specified time!) used in header
var currentDay = moment().format('dddd, MMMM Do');
// adding this value to header
currentDayEl.textContent = currentDay;

// current Time (no day!) used for time blocks
var currentTime = moment().format('LT');
console.log(currentTime);

var saveTimeBlocks = function() {
    localStorage.setItem("timeblocks", JSON.stringify(timeBlocks));
};

// Create function that assigns ids based on position in timeBlocks array in order to access them for localStorage