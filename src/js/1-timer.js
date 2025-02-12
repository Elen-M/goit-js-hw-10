import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from 'izitoast';  
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);

  const currentDate = new Date();
      if (selectedDate < currentDate) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight',

        });
          refs.button.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          refs.button.disabled = false;
      }
    }
};

flatpickr("#datetime-picker", options);
 
const timer = {
    intervalId: null,
    enableTime: null,
    
    start() {
    if(!userSelectedDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
      return;
      }
    this.enableTime = userSelectedDate.getTime();
    this.intervalId = setInterval(() => {
      this.tik();
    }, 1000); 
            
    refs.input.disabled = true;
    refs.button.disabled = true;
  },

    tik() {
      const currentTime = Date.now();
      const ms = this.enableTime - currentTime;

    if (ms <= 0) {
      clearInterval(this.intervalId);
      timerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(ms);
    timerDisplay(time);
  },

  stop() {
    clearInterval(this.intervalId);
    },
};

function timerDisplay({ days, hours, minutes, seconds }) {
    days = days.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    document.querySelector('[data-days]').textContent = days;
    document.querySelector('[data-hours]').textContent = hours;
    document.querySelector('[data-minutes]').textContent = minutes;
    document.querySelector('[data-seconds]').textContent = seconds;
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
};

const refs = {
    button: document.querySelector('button'),
    input: document.querySelector('#datetime-picker')
}
refs.button.addEventListener('click', () => {
    timer.start()
})
