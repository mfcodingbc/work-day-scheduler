// this variable stores an array which will contain the user data
var timeBlocks = {};

// this variable selects all timeblocks(rows) and creates an id for each
var timeBlocksSections = document.querySelectorAll('.row');
    for (var i = 0; i < timeBlocksSections.length; i++) {
        timeBlocksSections[i].id = "timeBlock"
    };

// create and set ids for all hours
var timeBlocksHourEl = document.querySelectorAll('.hour');
    for (var i = 0; i < timeBlocksHourEl.length; i++) {
        timeBlocksHourEl[i].id = 'hour-' + i;
    };

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

// loads the user's inputs from localStorage
var loadTimeBlocks = function() {
    timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    // if nothing in localStorage, create new Array
    if (!timeBlocks) {
        timeBlocks = {};
    }

    // this places the user inputs back where they where initially inputed
    for (var i = 0; i < timeBlocksSections.length; i++) {
        if (timeBlocks[i] === undefined) {
            timeBlocksEventEl[i].innerHTML = "";
        } else {
            timeBlocksEventEl[i].innerHTML = timeBlocks[i];
        }
    }

    auditTimeBlock();
};

// saves the user inputs into localStorage
var saveTimeBlocks = function() {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

var auditTimeBlock = function() {
    // current Time (no date!) used for comparing events to current time for color changes
    var currentTime = moment().format('H');

    // loop through events
    for (var i = 0; i < timeBlocksEventEl.length; i++) {
        // get the ids of each event element
        var timeBlocksEventID = timeBlocksEventEl[i].id;

        // get new element id so it can replace old event id with updated color-coding
        var timeBlocksEventNewID = document.getElementById(timeBlocksEventEl[i].id);

        // remove the old classes from previous element
        $(timeBlocksEventEl[i].id).removeClass(".past .present .future");

        // apply new class if event is in a past, present, or future hour
        if (timeBlocksEventID < currentTime) {
            $(timeBlocksEventNewID).addClass("past");
        } else if (timeBlocksEventID > currentTime) {
            $(timeBlocksEventNewID).addClass("future");
        } else {
            $(timeBlocksEventNewID).addClass("present");
        }
    }
};

// when the save button is clicked, this function runs
$("button").click(function() {
    // select 'this' (the savebutton) and give it its id attribute
    var saveBtnId = $("button").index(this);

    // select 'this', then go up to parent (the row) and give it its id attribute
    var timeBlockRow = $(this)
    .parent()
    .attr("id");

    // select 'this, go up to parent, find the class 'col-10' then take its value (the user text input)
    var timeBlockEvent = $(this)
    .parent()
    .find("textarea")
    .val()
    .trim();

    // push the needed variables into the timeBlock array inside timeBlocks
    timeBlocks[saveBtnId] = timeBlockEvent;

    saveTimeBlocks();
});

loadTimeBlocks();