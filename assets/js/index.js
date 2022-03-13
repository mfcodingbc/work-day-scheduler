// this variable stores an array with every hour and event
var timeBlocks = {};

// this variable selects all timeblocks(rows) and creates an id for each
var timeBlocksSections = document.querySelectorAll('.row');
    for (var i = 0; i < timeBlocksSections.length; i++) {
        timeBlocksSections[i].id = 'row-' + i;
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

    if (!timeBlocks) {
        timeBlocks = {
            data: []
        };
    }

console.log(timeBlocks);

    $.each(timeBlocks, function(list, arr) {
        arr.forEach(function(timeBlock) {
            appendTimeBlock(timeBlock.text, list);
        });
    });
};

var saveTimeBlocks = function() {
    localStorage.setItem("timeblocks", JSON.stringify(timeBlocks));
};

$("section").on('click', '.saveBtn', function() {
    // select 'this' (the savebutton) and give it its id attribute
    var saveBtnId = $(this).attr("id");

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
    var timeBlockText = $(this)
    .parent()
    .find(".col-10")
    .val();

    console.log(saveBtnId, timeBlockRow, timeBlockHour, timeBlockText);

    // push the needed variables into the data array inside timeBlocks
    timeBlocks.data.push({
        row: timeBlockRow,
        hour: timeBlockHour,
        event: timeBlockText
    })

    saveTimeBlocks();
});

loadTimeBlocks();