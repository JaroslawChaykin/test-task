const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {

    let secondsLeft = 0;
    let interval = null;

    function formatedTime(time) {
        let floorTime = Math.floor(time)
        return String(floorTime).length < 2 ? `0${floorTime}` : floorTime
    }

    return (seconds) => {
        secondsLeft = seconds;
        clearInterval(interval);

        interval = setInterval(() => {

            let hours = formatedTime(secondsLeft / 60 / 60 % 60);
            let minutes = formatedTime(secondsLeft / 60 % 60);
            let seconds = formatedTime(secondsLeft % 60);

            timerEl.innerText = `${hours}:${minutes}:${seconds}`;

            if (secondsLeft <= 0) {
                clearInterval(interval);
                timerEl.innerText = `hh:mm:ss`;
            }

            secondsLeft--;
        }, 1000);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    inputEl.value = inputEl.value.replace(/[^[\d]/g, '');
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});
