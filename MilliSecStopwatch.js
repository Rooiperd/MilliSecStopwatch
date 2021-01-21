//GLOBAL VARIABLES USED ACROSS VARIOUS FUNCTIONS
var timeStart = null, //STARTING TIME
    timeStop = null, //STOPPING TIME
    stopDuration = 0, //DURATION BETWEEN STOPPING AND STARTING STOPWATCH AGAIN WITHOUT RESET
    runTimer = null; //PLACEHOLDER FOR setInterval TO CALL runClock FUNCTION

//START FUNCTION INITIATES runTimer AFTER CHECKING timeStart
function start() {
  if (timeStart === null) {
    timeStart = new Date(); //RECORD INITIAL STARTING TIME
  }

  if (timeStop !== null) {
    stopDuration += (new Date() - timeStop); //ACCUMULATE TOTAL STOPPED DURATION FOR MULTIPLE STOP/STARTS
  }

  console.log(stopDuration); // log stopDuration to the console 
  runTimer = setInterval(runClock, 10);
}

//STOP FUNCTION STOPS runTimer AND RECORDS TIME AT STOPPING
function stop() {
  timeStop = new Date();
  clearInterval(runTimer);
}

//RESET FUNCTION STOPS runClock, RESETS GLOBAL VARIABLES AND timeDisplay
function reset() {
  clearInterval(runTimer);
  stopDuration = 0;
  timeStart = null;
  timeStop = null;
  document.getElementById("timeDisplay").innerHTML = "00:00:00:000"
}

//CLOCK RUNNING FUNCTION FOR COMPUTING ELAPSED TIME USING CURRENT TIME - START TIME - STOPPED DURATION
function runClock() {
  var currentTime = new Date(),
      timePassed = new Date(currentTime - timeStart - stopDuration), //COMPUTE ELAPSED TIME (ISSUES HERE LIKELY DUE TO TIME ZONES OR SOMETHING)
      hours = timePassed.getUTCHours(),
      mins = timePassed.getUTCMinutes(),
      secs = timePassed.getUTCSeconds(),
      ms = timePassed.getUTCMilliseconds();

  document.getElementById("timeDisplay").innerHTML =
    (hours > 9 ? hours : "0" + hours) + ":" +
    (mins > 9 ? mins : "0" + mins) + ":" +
    (secs > 9 ? secs : "0" + secs) + ":" +
    (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + "ms");

}
