let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;
    let minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    let seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    toggleButtons();
}

function stopStopwatch() {
    clearInterval(timer);
    isRunning = false;
    toggleButtons();
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    lapList.innerHTML = ''; // Clear lap list on reset
    toggleButtons();
}

function addLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

startButton.addEventListener('click', startStopwatch);

stopButton.addEventListener('click', stopStopwatch);

resumeButton.addEventListener('click', startStopwatch);

resetButton.addEventListener('click', resetStopwatch);

lapButton.addEventListener('click', function() {
    if (isRunning) {
        addLap();
    }
});

function toggleButtons() {
    startButton.disabled = isRunning;
    stopButton.disabled = !isRunning;
    resumeButton.style.display = isRunning ? 'none' : 'inline-block';
    resetButton.disabled = isRunning;
}
