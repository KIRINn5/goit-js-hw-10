import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formSubmit = document.querySelector('.form');

formSubmit.addEventListener('submit', event => {
  event.preventDefault();

  const confirmed = confirm("Are you sure you want to submit the form?");
  if (!confirmed) {
    return; // Don't proceed if the user cancels the submission
  }

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelector('input[name="state"]:checked');

  const delay = parseInt(delayInput.value);
  if (delayInput.value === '' || isNaN(delay)) {
    iziToast.error({
      message: '❌ Please enter a delay value',
      backgroundColor: 'red',
      messageColor: 'white',
      position: 'topRight',
      icon: null,
    });
    return;
  }

  const state = stateInputs.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise.then(() => {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    });
  }).catch(() => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    });
  });

  formSubmit.reset();
  delayInput.value = '';
});
