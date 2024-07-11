let timer;
let time = 0;
let isRunning = false;
let laps = [];
let milliseconds = 0;

function startPause() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startPause").textContent = "Start";
  } else {
    timer = setInterval(updateTime, 10);
    document.getElementById("startPause").textContent = "Pause";
  }
  isRunning = !isRunning;
}

function updateTime() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    time++;
  }
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  document.getElementById("clock").textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function padMilliseconds(value) {
  if (value < 10) return `00${value}`;
  if (value < 100) return `0${value}`;
  return value;
}

function lap() {
  laps.push(document.getElementById("clock").textContent);
  displayLaps();
}

function clearLaps() {
  laps = [];
  displayLaps();
}

function displayLaps() {
  let lapsList = document.getElementById("laps");
  lapsList.innerHTML = "";
  laps.forEach((lap, index) => {
    let li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

function reset() {
  clearInterval(timer);
  time = 0;
  milliseconds = 0;
  isRunning = false;
  document.getElementById("clock").textContent = "00:00:00:000";
  document.getElementById("startPause").textContent = "Start";
  laps = [];
  displayLaps();
}
