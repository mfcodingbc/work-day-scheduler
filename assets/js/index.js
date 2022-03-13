var currentDayEl = document.querySelector("#currentDay");

// current Day (no specified time!) used in header
var currentDay = moment().format('dddd, MMMM Do');
// adding this value to header
currentDayEl.textContent = currentDay;

// current Time (no day!) used for time blocks
var currentTime = moment().format('LT');
console.log(currentTime);

// var timeBlocks = {};

// if(!timeBlocks) {
//     timeBlocks = {
//         hour: [],
//         event: [],
//     };
// };