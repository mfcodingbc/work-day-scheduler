// this variable stores an array with every hour and event
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

var loadTimeBlocks = function() {
    timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    // if nothing in localStorage, create new object to track all timeBlock # Arrays
    if (!timeBlocks) {
        timeBlocks = {};
    }

    console.log(timeBlocks);

    for (var i = 0; i < timeBlocksSections.length; i++) {
        if (timeBlocks[i] === undefined) {
            timeBlocksEventEl[i].innerHTML = "";
        } else {
            timeBlocksEventEl[i].innerHTML = timeBlocks[i];
        }
        console.log('timeBlockRow: ', timeBlocks[i]);
    }

    auditTimeBlock();

    // for (var i = 0; i < timeBlocks.length; i++) {
    //     console.log(timeBlocks[i]);
    //     if (timeBlocks.timeBlock[i] === 
    //         document.getElementById("timeBlock").innerHTML = timeBlocks;
    //     } else {
    //         i++;
    //     }
    // };

// looping over object properties
    // $.each(timeBlocks, function(list, arr) {
    //     // looping over sub-array
    //     arr.forEach(function(timeBlock) {
    //         appendTimeBlock(timeBlock, list);
    //     });
    // });
};

var saveTimeBlocks = function() {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

var auditTimeBlock = function() {
    // get hour from event element
    // select 'this, go to parent element (section) find the class 'hour' (within 1st div) then take its id attribute

    for (var i = 0; i < timeBlocksSaveEl.length; i++) {
        var time = moment().set('hour', i);
        // apply new class if event is in a past, present, or future hour
        if (moment().isBefore(time)) {
            $(timeBlocksEventEl).addClass("future");
        } else if (moment().isSame(time)) {
            $(timeBlocksEventEl).addClass("present");
        } else if (moment().isAfter(time)) {
            $(timeBlocksEventEl).addClass("past");
        }
    }
};

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