import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');

const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const selectedTime = selectedDate.getTime();

    if (selectedTime <= currentTime) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

let countdownInterval;

function startCountdown(endTime) {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      alert('Countdown Finished');
      updateInterface(0);
    } else {
      updateInterface(timeDifference);
    }
  }, 1000);
}

function updateInterface(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Disable the button when the page loads
startButton.disabled = true;

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const endTime = selectedDate.getTime();

  startButton.disabled = true; // Disable the button after clicking
  startCountdown(endTime);
});