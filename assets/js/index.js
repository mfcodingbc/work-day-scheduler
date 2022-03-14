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

// current Time (no day!) used for time blocks
var currentTime = moment().format('LT');
console.log(currentTime);

var appendTimeBlock = function(timeBlockText, timeBlockList) {

    var eventTextArea = $("<textarea>")
    .addClass("col-10 lead")
    .text(timeBlockText);

    $("#event-" + timeBlockList).replaceWith(eventTextArea);

    // run audit function to compare current time with time of events
}

var loadTimeBlocks = function() {
    timeBlocks = JSON.parse(localStorage.getItem("timeblocks"));

    // if nothing in localStorage, create new object to track all timeBlock # Arrays
    if (!timeBlocks) {
        timeBlocks = {
            timeBlock: []
        };
    }

    // var data = {row: "col-0", hour: "12 AM", event: "Hello World!"};

    // var result = Object.entries(timeBlocks.data);

    // for (var i = 0; i < result.length; i++) {
    //     for (var z = 0; z < result[i].length; z++) {
    //         console.log(result[i][z] + " ");
    //     }
    //     console.log("</br>")
    // };
        // if (data[i] === timeBlocks.row[i]) {
        //     timeBlocks = JSON.parse(localStorage.getItem("timeblocks"));
        // } else {
        //     i++;
        // }


console.log(timeBlocks);

    // $.each(timeBlocks, function(list, arr) {
    //     arr.forEach(function(timeBlock) {
    //         appendTimeBlock(timeBlock.text, list);
    //     });
    // });
};

var saveTimeBlocks = function() {
    localStorage.setItem("timeblocks", JSON.stringify(timeBlocks));
};

$("button").click(function() {
    // select 'this' (the savebutton) and give it its id attribute
    var saveBtnId = $("button").index(this);

    // select 'this', then go up to parent (the row) and give it its id attribute
    var timeBlockRow = $(this)
    .parent()
    .attr("id");

    // select 'this, go up to parent, find the class 'hour' then take its text and trim it
    var timeBlockHour = $(this)
    .parent()
    .find(".hour")
    .text()
    .trim();

    // select 'this, go up to parent, find the class 'col-10' then take its value (the user text input)
    var timeBlockEvent = $(this)
    .parent()
    .find("textarea")
    .val()
    .trim();

    console.log("That was saveBtn #" + saveBtnId);

    console.log(saveBtnId, timeBlockRow, timeBlockHour, timeBlockEvent);

    // push the needed variables into the data array inside timeBlocks
    timeBlocks[timeBlockRow][saveBtnId] = timeBlockEvent;

    saveTimeBlocks();
});

loadTimeBlocks();