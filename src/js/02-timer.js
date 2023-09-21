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

//wybrane opcje biblioteki flickr//
const flatpickrOptions = {
    enableTime: true,
    defaultDate: new Date(),
    time_24hr: true,
    //hourIncrement: 1,
    minuteIncrement: 1,

    onClose(selectedDates) {     //onClose to metoda w konfiguracji flatpickr
        const pickedDate = selectedDates[0];    //wybór pierwszego elementu [0] z tablicy dat 
        if (pickedDate > new Date()) {             //warunek sprawdzenia czy data jest z przyszlości
            selectedData = pickedDate;
            startButton.disabled = false;        //...jeśli tak to odblokowanie butona start//
        } else {
            Notiflix.Notify.failure('Choosen date is past, choose a date in the future ');
            startButton.disabled = true;
        }
    }
};

flatpickr(dateInput, flatpickrOptions);  //inicjalizacja flatpickr na inpucie


//obliczenie różnicy czasu

function calculateTimeDifference(ms) {
    return {
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((ms % (1000 * 60)) / (1000))
    };
}


function addLeadingZero(value) {                  //funkcja dodająca zero do długości stringu mniejszej niż 2
    const stringValue = value.toString();
    if (stringValue.length < 2) {
        return '0' + stringValue;
    }
    return stringValue;
}    

let countdownInterval = 0;        //zmienna do interwału odliczania
const startCountdown = () => {
    if (countdownInterval) {
        clearInterval(countdownInterval);    //jeśli jest już interwał to trzeba go zatrzymać
    }

    countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = selectedData - currentTime;
        if (timeDifference < 0) {                       //Jeśli czas minął...
            clearInterval(countdownInterval);//.. to zatrzymaj interwał
            return;
        }
        // pozostały czas  - obliczenie
        const timeValues = calculateTimeDifference(timeDifference);
        //wyświetlanie licznika  - aktualizacja
        daysElement.textContent = addLeadingZero(timeValues.days);
        hoursElement.textContent = addLeadingZero(timeValues.hours);
        minutesElement.textContent = addLeadingZero(timeValues.minutes);
        secondsElement.textContent = addLeadingZero(timeValues.seconds);
    }, 1000) //odświeżanie co 1s.
};

//nasłuch na click na startbutton
startButton.addEventListener('click', startCountdown);
