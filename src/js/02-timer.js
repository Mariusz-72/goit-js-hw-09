import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.6.min.css';

//pobranie elementów interfejsu użytkownika//
const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

//zmienna do przechowywania daty początkowej//
let selectedData = null;





