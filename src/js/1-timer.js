import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';

const datepicker = {
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const selectedTime = selectedDate.getTime();

    if (selectedTime <= currentTime) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
  startCountdown(endTime) {
    return new Promise((resolve, reject) => {
      countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = endTime - currentTime;

        if (timeDifference <= 0) {
          clearInterval(countdownInterval);
          iziToast.success({
            title: 'Notification',
            message: 'Countdown Finished',
            position: 'topRight',
          });
          updateInterface(0);
          resolve();
        } else {
          updateInterface(timeDifference);
        }
      }, 1000);
    });
  }
};

export default datepicker;
