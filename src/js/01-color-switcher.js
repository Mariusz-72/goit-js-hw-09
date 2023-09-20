function getRandomHexColor() {
    return `#${Marh.floor(Math.random() * 16777215).toString(16)}`;
}
const startButton = document.querySelector('[data-start');
const stopButton = document.querySelector('[data-stop]');

const body = document.body;

let intervalId = null;

startButton.addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            body.style.backgroundColor = getRandomHexColor();
        }, 1000);

        startButton.disabeld = true;
    }
    
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabeld = false;
})