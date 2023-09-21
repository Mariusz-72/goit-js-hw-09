function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`; //funkcja generująca losowy kolor
}
const startButton = document.querySelector('[data-start');
const stopButton = document.querySelector('[data-stop]');  // "dostanie się" do przycisków ma podst ich atrybutów

const body = document.body;

let intervalId = null;     // potrzebna dodatkowa zmienna

startButton.addEventListener('click', () => {        //obsługa clicku na przycisku start
    if (!intervalId) {                                               // warunek sprawdzający czy zmiana koloru jest zatrzymana
        intervalId = setInterval(() => {                     // ..jeśli tak to uruchomienie zmian co 1sek.
            body.style.backgroundColor = getRandomHexColor();     //ustawienie losowego koloru dla tła w body
        }, 1000);

        startButton.disabeld = true;      //zablokowanie przycisku start  - aby nie reagował podczas zmian koloru
    }
    
});

stopButton.addEventListener('click', () => {     //dodanie nasłuchu na przycisk stop
    clearInterval(intervalId);     //zatrzymanie interwału 
    intervalId = null;                   // wyzerowanie intervalID
    startButton.disabeld = false;             // odblokowanie startu , aby można go było znów kliknąć
})