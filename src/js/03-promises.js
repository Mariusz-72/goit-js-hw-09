function createPromise(position, delay) {
  return new Promise((resolve, delay))
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay }); // Fulfill
    } else {
      reject({ position, delay });  // Reject
    }

  }, delay);
}
