
  const valueElement = document.getElementById('value');
  const incrementBtn = document.getElementById('increment');
  const decrementBtn = document.getElementById('decrement');
  
  let count = 1;

  function updateCounter() {
    valueElement.textContent = count;
  }

  incrementBtn.addEventListener('click', () => {
    count++;
    updateCounter();
  });

  decrementBtn.addEventListener('click', () => {
    if (count > 1) { // Prevent going below 1
      count--;
      updateCounter();
    }
  });
