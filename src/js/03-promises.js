import Notiflix from 'notiflix'; 
import 'notiflix/dist/notiflix-3.2.6.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

//nasłuch na "submit"
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(form.querySelector('[name="delay"]').value); //poberanie wartości z formularza
  const step = parseInt(form.querySelector('[name="step"]').value);
  const amount = parseInt(form.querySelector('[name="amount"]').value);

  let position = 1;                   //inicjowanie zmiennych do tworzenia promisów  + ich obsługa
  let currentDelay = delay;

  function createAndHandlePromises() {     //tworzenie i obsługa obietnic w pętli
    if (position <= amount) {                 //warunek
      createPromise(position, currentDelay)
        
        .then(({ position, delay }) => {        //jeśli sukces to powiadomienie z notiflixa
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
          
          
          
    })
        
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    
  });
//        .finally(() => {    //wykonane niezależnie od wyniku sukces/odrzucenie
//          position++;                        //...aktualizacja zmiennch position i currentDelay
//          currentDelay += step;
//          createAndHandlePromises();           //wywołanie funkcji
      //       });
      position++;
      currentDelay += step;
      createAndHandlePromises();
    }
  }

  createAndHandlePromises();
});
