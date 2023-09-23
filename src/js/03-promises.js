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
  const delay = parseInt(form.querySelector('[name="delay"]').value);
  const step = parseInt(form.querySelector('[name="step"]').value);
  const amount = parseInt(form.querySelector('[name="amount"]').value);

  let position = 1;
  let currentDelay = delay;

  function createAndHandlePromises() {
    if (position <= amount) {
      createPromise(position, currentDelay)
        
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            'Fulfilled promise ${position} in ${delay}ms'
          );
        }) 
        
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure('Rejected promise ${position} in ${delay}ms');
        })
        
        .finally(() => {
          position++;
          currentDelay += step;
          createAndHandlePromises();
        });
    }
  }

  createAndHandlePromises();
});
