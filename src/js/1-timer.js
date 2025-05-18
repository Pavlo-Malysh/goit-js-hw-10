import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import 'material-icons/iconfont/material-icons.css';

const dataInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector(".btn-start")
const daysElem = document.querySelector("span[data-days]")
const hoursElem = document.querySelector("span[data-hours]")
const minutesElem = document.querySelector("span[data-minutes]")
const secondsElem = document.querySelector("span[data-seconds]")

let userSelectedDate;

const fp = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]

    if (Date.now() < userSelectedDate.getTime()) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        progressBar: false,
        messageColor: 'white',
        backgroundColor: 'rgb(231, 76, 76)',
        iconText: 'error_outline',
        icon: 'material-icons',
        iconColor: 'white',

      })
    }
  },
})

let IntervalId;

startBtn.addEventListener("click", (e) => {

  IntervalId = setInterval(() => {
    const initDate = Date.now()
    const diffMs = userSelectedDate - initDate

    if (diffMs > 0) {
      const timeToStr = addLeadingZero(diffMs)

      daysElem.textContent = timeToStr.dayStr;
      hoursElem.textContent = timeToStr.hourStr;
      minutesElem.textContent = timeToStr.minStr;
      secondsElem.textContent = timeToStr.secStr;

    } else {
      clearInterval(IntervalId)
      dataInput.disabled = false;
    }


  }, 1000)

  startBtn.disabled = true;
  dataInput.disabled = true;
})

//


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(objTime) {
  const { days, hours, minutes, seconds } = convertMs(objTime)


  let dayStr = days.toString().padStart(2, "0")
  let hourStr = hours.toString().padStart(2, "0")
  let minStr = minutes.toString().padStart(2, "0")
  let secStr = seconds.toString().padStart(2, "0")

  return { dayStr, hourStr, minStr, secStr }

}